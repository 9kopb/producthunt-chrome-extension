/**
 * Dependencies.
 */

let React = require('react');
let BodyModifier = require('./body-modifier.react');

/**
 * Product Pane View.
 *
 * Opens up the ProductHunt product pane in an iframe on
 * the right side of the screen. Also, adds an overlay and
 * disables scrolling on the body.
 *
 * Usage:
 *
 * ```js
 * <Pane url="https://www.producthunt.com/posts/mixpanel" onClick=fn />
 * ```
 *
 * Properties:
 *
 * - `url`:       Product URL
 * - `bodyClass`: Body class to be added when showing the overlay
 * - `onClick`:   Overlay click event
 *
 * @class
 */

let Pane = React.createClass({

  /**
   * Render the view.
   */

  render() {
    if (!this.props.url) {
      return false;
    }

    // TODO(vesln): temp hack, PH api should return https
    this.props.url = this.props.url.replace('http', 'https');

    return (
      <div>
        <BodyModifier className={this.props.bodyClass} />
        <div className="__phc-overlay" onClick={this.props.onClick}></div>
        <iframe src={this.props.url} className="__phc-pane" />
      </div>
    );
  }
});

/**
 * Export `Pane`.
 */

module.exports = Pane;
