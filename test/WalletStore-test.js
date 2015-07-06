'use strict';

var rewire = require('rewire');
var rewireModule = require('./rewire-module');
var jasmineReact = require('jasmine-react-helpers');
var textEncoding = require('text-encoding');

describe('WalletStore', () => {
    var WalletStore;
    var WalletContainer;
    var WalletActions = require('../app/components/WalletActions');
    var React = require('react');
    var TestUtils = require('react/lib/ReactTestUtils');
    var WalletContainerMock = React.createClass({
        onWalletChange: function(walletChange) {
            console.log('MOCK: ' + walletChange);
        },
        render: function() {
            return <div />;
        },
        componentDidMount: function() {
            WalletActions.storedPassword.listen(this.onStoredPassword);
            this.unsubscribe = WalletStore.listen(this.onWalletChange);
        }
    });

    beforeEach(() => {
        global.TextEncoder = textEncoding.TextEncoder;
        WalletStore = rewire('../app/components/WalletStore');
        rewireModule(WalletStore, {
            WalletContainer: WalletContainerMock
        });
    });

    afterEach(() => {
        console.log('END');
    });

    it('can import wif', () => {
        jasmineReact.spyOnClass(WalletContainerMock, 'onWalletChange').and.callThrough();
        TestUtils.renderIntoDocument(<WalletContainerMock />);
        WalletStore.onWifImport('L4gs7CaHLWkHug2AafS6sP8NDRXw4saziAiejBcPXkppTSungb6F');
        var val = '';
        jasmine.clock().tick();
        expect(jasmineReact.classPrototype(WalletContainerMock).onWalletChange).toHaveBeenCalled();
    });
});
