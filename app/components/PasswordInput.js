'use strict';

var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux')
var WalletActions = require('./WalletActions');
var WalletContainer = require('./WalletContainer');
var WalletStore = require('./WalletStore');

var Bootstrap = require('react-bootstrap')
var Input = Bootstrap.Input;
var Button = Bootstrap.Button;
var ButtonInput = Bootstrap.ButtonInput;

var PasswordInput = React.createClass({
    displayName: 'PasswordInput',
    propTypes: {
        init: React.PropTypes.bool
    },
    _enterPressed: function(e) {
        if (e.keyCode == 13) {
            var pass = e.target.value.trim();
            if (this.props.init) {
                WalletActions.newPassword(pass);
            } else {
                WalletActions.password(pass);
            }
            return e.preventDefault();
        }
    },
    componentDidMount: function() {
    },
    componentWillUnmount: function() {
    },
    render: function() {
        if (this.props.init) {
            return (
                <form>
        <Input ref='password' addonBefore='Password' type='text' onKeyDown={this._enterPressed} />
        </form>
            );
            //        <Input ref='passwordConfirm' addonBefore='Password' type='text' />
        } else {
            return (
                <form>
                Log in
        <Input ref='password' addonBefore='Password' type='text' onKeyDown={this._enterPressed} />
        </form>
            );
        }

    }
});

module.exports = PasswordInput;
