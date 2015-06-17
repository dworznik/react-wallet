'use strict';

var React = require('react');
var Reflux = require('reflux');
var WalletActions = require('./WalletActions');
var WalletStore = require('./WalletStore');
var WIFInput = require('./WIFInput');
var KeysForm = require('./KeysForm');

var WIFContainer = React.createClass({
    displayName: 'WIFContainer',
    getInitialState: function() {
        return {
            wifBody: ''
        }
    },
    getContent: function() {
        return this.state.wifBody;
    },
    onBodyChange: function(newWif) {
        this.state.wifBody = newWif;
    },
    onImportClick: function(newWif) {
        console.log('Import!');
        WalletActions.wifImport(newWif);
    },
    componentDidMount: function() {
        this.unsubscribe = WalletStore.listen(this.onWalletChange);
    },
    componentWillUnmount: function() {
        this.unsubscribe();
    },
    onWalletChange: function(walletChange) {
        if (walletChange) {
            console.log('Wallet change: ' + JSON.stringify(walletChange));
            var wifBody = this.state.wifBody;
            this.setState({
                wifBody: wifBody,
                keys: {
                    privKey: walletChange.privKey.toString(),
                    pubKey: walletChange.pubKey.toString(),
                    address: walletChange.address.toString(),
                }
            });
        }
    },
    render: function() {
        if (this.state.keys) {
            return (
                <div>
                <WIFInput content={this.getContent()} onChange={this.onBodyChange} onClick={this.onImportClick}/>
                <KeysForm content={this.state.keys} />
                </div>
            );
        } else {
            return (
                <WIFInput content={this.getContent()} onChange={this.onBodyChange} onClick={this.onImportClick}/>
            );
        }
    }
});

module.exports = WIFContainer;
