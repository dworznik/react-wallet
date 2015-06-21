'use strict';

var React = require('react');
var Reflux = require('reflux')
var WalletActions = require('./WalletActions')
var WalletStore = require('./WalletStore');

var Bootstrap = require('react-bootstrap')
var Input = Bootstrap.Input;
var Button = Bootstrap.Button;
var ButtonInput = Bootstrap.ButtonInput;

var WIFInput = React.createClass({
    displayName: 'WIFInput',
    propTypes: {
        content: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onClick: React.PropTypes.func
    },
    onChange: function(e) {
        this.props.onChange();
    },
    onClick: function(e) {
        this.props.onClick();
    },
    render: function() {
        return (
            <form>
        <Input id='wif-input' type='textarea'  placeholder='Paste WIF' onChange={this.onChange}  />
        <ButtonInput value='Import' onClick={this.onClick} />
        </form>
        );
    }
});

module.exports = WIFInput;
