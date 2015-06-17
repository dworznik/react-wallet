'use strict';

var Reflux = require('reflux');
var WalletActions = require('./WalletActions');
var LocalStoreMixin = require('./LocalStoreMixin');

var bitcore = require('bitcore');

var PrivateKey = bitcore.PrivateKey;
var PublicKey = bitcore.PublicKey;
var Address = bitcore.Address;
var network = bitcore.Networks.testnet;


var wif = "";

var WalletStore = Reflux.createStore({
    listenables: [WalletActions],
    mixins: [LocalStoreMixin],
    init: function() {},
    getInitialState: function() {
        return wif;
    },
    onWifImport: function(newWif) {
        wif = newWif;
        try {
            var privKey = PrivateKey.fromWIF(wif);
            var pubKey = privKey.toPublicKey();
            var address = pubKey.toAddress(network);
            this.trigger({
                privKey: privKey,
                pubKey: pubKey,
                address: address
            });
        } catch (e) {
            console.log('Error: ' + e);
            this.trigger(null);
        }
    }
});

module.exports = WalletStore;
