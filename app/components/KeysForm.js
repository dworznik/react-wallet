'use strict';

var React = require('react');
var Reflux = require('reflux')
var WalletActions = require('./WalletActions')
var WalletStore = require('./WalletStore');

var Bootstrap = require('react-bootstrap')
var Input = Bootstrap.Input;
var Button = Bootstrap.Button;
var ButtonInput = Bootstrap.ButtonInput;

var KeysForm = React.createClass({
    displayName: 'KeysForm',
    propTypes: {
        content: React.PropTypes.object,
    },
    render: function() {
        return (
            <form>
        <Input addonBefore='Private Key' type='text'  value={this.props.content.privKey} disabled={true} />
        <Input addonBefore='Public Key' type='text'  value={this.props.content.pubKey} disabled={true} />
        <Input addonBefore='Address' type='text'  value={this.props.content.address} disabled={true} />
        </form>
        );
    }
});

module.exports = KeysForm;
