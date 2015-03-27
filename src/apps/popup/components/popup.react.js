/**
 * Dependencies.
 */

let React = require('react');
let Tab = require('./tab.react');

/**
 * Constants.
 */

const SEARCH_URL = process.env.SEARCH_URL;
const POST_URL = process.env.POST_URL;

/**
 * Popup Component.
 *
 * Renders the popup.
 *
 * Usage:
 *
 * ```js
 * <Popup />
 * ```
 *
 * State:
 *
 * - url: Popup URL address
 *
 * @class
 */

let Popup = React.createClass({

  /**
   * Return initial state.
   *
   * @returns {Object}
   */

  getInitialState() {
    return { url: SEARCH_URL };
  },

  /**
   * Render the view.
   */

  render() {
    return (
      <div>
        <Tab url={this.state.url} />
      </div>
    );
  },

  /**
   * Open the submissions page.
   *
   * @private
   */

  _openSubmission() {
    this.setState({ url: POST_URL });
  },

  /**
   * Open the serach page.
   *
   * @private
   */

  _openSearch() {
    this.setState({ url: SEARCH_URL });
  }
});

/**
 * Export `Popup`.
 */

module.exports = Popup;
