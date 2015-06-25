'use strict';

describe('WalletStore', () => {
  var WalletStore;
  var React = require('react');
  var TestUtils = require('react/lib/ReactTestUtils');

  beforeEach(() => {
    WalletStore = require('../app/components/WalletStore');
  });

  it('can import wif', () => {
    var val = '';
    expect(val).toBe('');
  });
});
