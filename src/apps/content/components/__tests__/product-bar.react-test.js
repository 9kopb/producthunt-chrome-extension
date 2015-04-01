jest.autoMockOff();

jest.mock(filePath('/common/body-modifier/body-modifier.react'));
jest.mock('../top-elements.react.js');

describe('ProductBar', function() {
  let ProductBar = require('../product-bar.react');
  let ProductStore = load('/common/stores/product');
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;

  it('does not render if there is no product', function() {
    let bar = TestUtils.renderIntoDocument(<ProductBar />);
    expect(bar.getDOMNode()).toBeNull();
  });

  it('listens for product change events', function() {
    let bar = TestUtils.renderIntoDocument(<ProductBar />);
    ProductStore.setData({ foo: 'bar' });
    ProductStore.emitChange();
    expect(bar).toMatchContent('iframe');
  });

  it('can open the product pane', function() {
    let bar = TestUtils.renderIntoDocument(<ProductBar />);
    let product = { discussion_url: 'test' };

    ProductStore.setData(product);
    ProductStore.emitChange();

    let node = bar.getDOMNode();
    let link = node.querySelector('div.container');

    TestUtils.Simulate.click(link);

    expect(node.innerHTML).toContain(product.discussion_url);
  });
});
