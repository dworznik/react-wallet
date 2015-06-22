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
    getInitialState: function() {
        return {
            wif: null
        };
    },
    propTypes: {
        content: React.PropTypes.string,
        onImportClick: React.PropTypes.func
    },
    onChange: function(e) {
        this.setState({
            wif: e.target.value.trim()
        });
    },
    onClick: function(e) {
        var wif = this.state.wif;
        this.props.onImportClick(wif);
    },
    render: function() {
        return (
            <form>
        <Input ref='wif' type='textarea'  placeholder='Paste WIF' onChange={this.onChange}  />
        <ButtonInput value='Import' onClick={this.onClick} />
        </form>
        );
    }
});

module.exports = WIFInput;
