'use strict';

var _ = require('lodash');

var Reflux = require('reflux');
var WalletActions = require('./WalletActions');
var LocalStoreMixin = require('./LocalStoreMixin');

var bitcore = require('bitcore');

var PrivateKey = bitcore.PrivateKey;
var PublicKey = bitcore.PublicKey;
var Address = bitcore.Address;
var network = bitcore.Networks.testnet;

var wif = "";

var jsonToKeys = function(data) {
    console.log('co: ' + JSON.stringify(data));
    return _.transform(data, function(result, v, k) {
        if (k == 'privKey') {
            result[k] = PrivateKey.fromJSON(v);
        } else if (k == 'pubKey') {
            result[k] = PublicKey.fromJSON(v);
        } else if (k == 'address') {
            result[k] = Address.fromJSON(v);
        }
    });
};

var WalletStore = Reflux.createStore({
    listenables: [WalletActions],
    mixins: [LocalStoreMixin],
    init: function() {
        this.load(); // it will fail to authenticate without the password, but will load data (salt, iv) from the store if it exists
    },
    getInitialState: function() {
        return wif;
    },
    onNewPassword: function(newPassword) {
        var that = this;
        this.authenticate(newPassword).then(function(key) {
            that.save({}).then(function() {
                WalletActions.storedPassword();
            });
        });
        console.log('New password: ' + newPassword);
    },
    onPassword: function(password) {
        var that = this;
        console.log('onpass');
        this.authenticate(password).then(function(key) {
            that.load().then(function(data) {
                if (data.keys) {
                    var keys = jsonToKeys(data.keys);
                    console.log(keys);
                    that.trigger({
                        privKey: keys.privKey.toString(),
                        pubKey: keys.pubKey.toString(),
                        address: keys.address.toString()
                    });
                }
            });
        });
    },
    onWifImport: function(newWif) {
        console.log('New WIF: ' + newWif);
        wif = newWif;
        try {
            var privKey = PrivateKey.fromWIF(wif);
            var pubKey = privKey.toPublicKey();
            var address = pubKey.toAddress(network);
            this.save({
                wif: wif,
                keys: {
                    privKey: privKey,
                    pubKey: pubKey,
                    address: address
                }
            });
            this.trigger({
                privKey: privKey.toString(),
                pubKey: pubKey.toString(),
                address: address.toString()
            });
        } catch (e) {
            console.log('Error: ' + e);
            this.trigger(null);
        }
    }
});

module.exports = WalletStore;
