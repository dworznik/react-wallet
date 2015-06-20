'use strict';

var _ = require('lodash');
var Promise = require('promise');
var Uint8Util = require('../lib/uint8util');
var ls = global.localStorage;

const NAMESPACE = 'react-wallet-data';

var crypto = global.crypto;

var key = null;

var encrypt = function(data, key) {
    return '';
};

var decrypt = function(data, key) {
    return '';
};

module.exports = {
    authenticate: function(password) {
        var that = this;

        // convert password to key
        // no PBKDF2 in Chrome or IE yet, so use a salted hash
        var hmacSha256 = {
            name: 'hmac',
            hash: {
                name: 'sha-256'
            }
        };
        var encoder = new TextEncoder();
        var buf = encoder.encode(password);


        if (!this.initialized) {
            this.salt = new Uint8Array(32);
            crypto.getRandomValues(this.salt);
            this.hexSalt = Uint8Util.toHexString(this.salt);

            this.iv = new Uint8Array(16);
            crypto.getRandomValues(this.iv);
            this.hexIV = Uint8Util.toHexString(this.iv);
            this.initialized = true;
        }

        return crypto.subtle.importKey('raw', that.salt, hmacSha256, true, ['sign', 'verify']).then(function(result) {
            return crypto.subtle.sign(hmacSha256, result, buf).then(function(result) {
                var keyBuf = new Uint8Array(result);

                // importKey for later AES encryption
                return crypto.subtle.importKey('raw', keyBuf, {
                    name: 'AES-CBC'
                }, true, ['encrypt', 'decrypt']).then(function(result) {
                    that.authenticated = true;
                    that.encryptionKey = result;
                    return result;
                });
            });
        });
    },
    isAuthenticated: function() {
        return this.authenticated;
    },
    isInitialized: function() {
        return !_.isEmpty(ls.getItem(NAMESPACE));
    },
    save: function(value, cb) {
        var encoder = new TextEncoder();
        var todosBuf = encoder.encode(JSON.stringify(value));
        var aesCbc = {
            name: 'AES-CBC',
            iv: this.iv
        };
        var data = {
            salt: this.hexSalt,
            iv: this.hexIV,
            ciphertext: null
        };

        return crypto.subtle.encrypt(aesCbc, this.encryptionKey, todosBuf).then(function(result) {
            data.ciphertext = Uint8Util.toHexString(new Uint8Array(result));
            ls.setItem(NAMESPACE, JSON.stringify(data));
        });
    },
    load: function() {
        var that = this;
        var store = ls.getItem(NAMESPACE);
        var data = (store && JSON.parse(store));
        var promise = new Promise(function(resolve, reject) {
            if (!data) {
                reject(new Error('no data'))
            } else {
                if (!that.initialized) {
                    that.hexSalt = data.salt;
                    that.salt = Uint8Util.fromHexString(that.hexSalt);
                    that.hexIV = data.iv;
                    that.iv = Uint8Util.fromHexString(that.hexIV);
                    that.hasTodos = !!data.ciphertext;

                    that.initialized = true;
                }
                if (!that.authenticated) {
                    reject(new Error('not authenticated'))
                } else if (!data.ciphertext) {
                    resolve([]);
                } else {
                    var buf = Uint8Util.fromHexString(data.ciphertext);
                    var aesCbc = {
                        name: 'AES-CBC',
                        iv: that.iv
                    };
                    crypto.subtle.decrypt(aesCbc, that.encryptionKey, buf).then(function(result) {
                        console.log('Yo');
                        var decoder = new TextDecoder();
                        var plaintext = decoder.decode(new Uint8Array(result));
                        try {
                            var res = JSON.parse(plaintext);
                            resolve(res);
                        } catch (err) {
                            console.log(err);
                            reject(err);
                        }
                    }, function(err) {
                        console.log(err);
                        reject(err);
                    });
                }
            }
        });

        return promise;
    },
    generateKey: function(password) {

    }
}
