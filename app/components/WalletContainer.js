'use strict';

var _ = require('lodash');

var React = require('react');
var Reflux = require('reflux');
var WalletActions = require('./WalletActions');
var WalletStore = require('./WalletStore');
var WIFInput = require('./WIFInput');
var KeysForm = require('./KeysForm');
var PasswordInput = require('./PasswordInput');

var WalletContainer = React.createClass({
    displayName: 'WalletContainer',
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
        WalletActions.storedPassword.listen(this.onStoredPassword);
        this.unsubscribe = WalletStore.listen(this.onWalletChange);
    },
    componentWillUnmount: function() {
        this.unsubscribe();
    },
    onStoredPassword: function() {
        console.log('New password saved');
        this.setState({
            wifBody: ''
        });
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
    _renderInit: function() {
        return (
            <PasswordInput init={true} />
        );
    },
    _renderLogin: function() {
        return (
            <PasswordInput init={false} />
        );
    },
    _renderWif: function() {
        return (
            <WIFInput content={this.getContent()} onChange={this.onBodyChange} onClick={this.onImportClick}/>
        );
    },
    _renderWallet: function() {
        return (
            <div>
                <WIFInput content={this.getContent()} onChange={this.onBodyChange} onClick={this.onImportClick}/>
                <KeysForm content={this.state.keys} />
                </div>
        );
    },
    render: function() {
        console.log('Render : ' + WalletStore.isInitialized());
        if (WalletStore.isInitialized()) {
            if (WalletStore.isAuthenticated()) {
                if (this.state.keys) {
                    return this._renderWallet();
                } else {
                    return this._renderWif();
                }
            } else {
                return this._renderLogin();
            }
        } else {
            return this._renderInit();
        }

    }
});

module.exports = WalletContainer;
