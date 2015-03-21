/**
 * Dependencies.
 */

let React = require('react');
let debug = require('debug')('content:main');
let ProductBar = require('./components/product-bar.react');
let api = require('../../common/api');
let Detector = require('./util/detector');
let getHost = require('./util/get-host');

/**
 * Constants.
 */

const PRODUCT_HUNT_HOST = process.env.PRODUCT_HUNT_HOST;
const BAR_DISABLED_KEY = process.env.BAR_DISABLED_KEY;

/**
 * Locals.
 */

let referrer = getHost(document.referrer);
let currentHost = location.host;
let detector = new Detector(PRODUCT_HUNT_HOST, currentHost, referrer);

/**
 * Render the product bar.
 *
 * @private
 */

function render() {
  // check if we should show the product bar
  // on the current page
  if (detector.enable()) {
    debug('showing product bar...');
    let containerEl = document.createElement('div');

    // insert the container
    document.body.insertBefore(containerEl, document.body.firstChild)

    // render the product bar
    React.render(
      <ProductBar />,
      containerEl
    );

    // fetch the product data
    api.getProduct(location.href);
  } else {
    debug('not showing product bar...');
  }
}

let option = {};
option[BAR_DISABLED_KEY] = false;

chrome.storage.sync.get(option, function(items) {
  if (!items[BAR_DISABLED_KEY]) {
    debug('bar enabled');
    render();
  } else {
    debug('bar disabled');
  }
});
