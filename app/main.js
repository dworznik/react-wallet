'use strict';

require('./main.css');


var ECIES= require('bitcore-ecies');
var bitcore = require('bitcore');

var React = require('react');

var WalletContainer = require('./components/WalletContainer');

React.render(
    <WalletContainer />, document.getElementById('main'));
