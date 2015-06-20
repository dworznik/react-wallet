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
    _handleKeyUp: function(e) {
        if (e.keyCode == 13) {
            var el = document.getElementById('password-input');
            if (this.props.init) {
                WalletActions.newPassword(el.value);
            } else {
                WalletActions.password(el.value);
            }
            return e.preventDefault();
        }
    },
    componentDidMount: function() {
        //TODO Use this.getDOMNode()
        if (this.props.init) {
            var el1 = document.getElementById('password-input');
            el1.addEventListener('keydown', this._handleKeyUp, false);
            // var el2 = document.getElementById('password-confirm');
            // el2.addEventListener('keydown', this._handleKeyUp, false);
        } else {
            var el = document.getElementById('password-input');
            el.addEventListener('keydown', this._handleKeyUp, false);
        }
    },
    componentWillUnmount: function() {
        if (this.props.init) {
            var el1 = document.getElementById('password-input');
            el1.removeEventListener('keydown', this._handleKeyUp, false);
            // var el2 = document.getElementById('password-confirm');
            // el2.removeEventListener('keydown', this._handleKeyUp, false);
        } else {
            var el = document.getElementById('password-input');
            el.removeEventListener('keydown', this._handleKeyUp, false);
        }
    },
    render: function() {
        if (this.props.init) {
            return (
                <form>
        <Input id='password-input' addonBefore='Password' type='text' />
        </form>
            );
            //        <Input id='password-confirm' addonBefore='Password' type='text' />
        } else {
            return (
                <form>
        <Input id='password-input' addonBefore='Password' type='text' />
        </form>
            );
        }

    }
});

module.exports = PasswordInput;
