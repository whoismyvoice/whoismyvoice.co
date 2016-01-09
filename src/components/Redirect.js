import React from 'react';

// Component
import BaseComponent from './BaseComponent';

class Redirect extends BaseComponent {
  componentDidMount() {
    window.location = 'http://health.whoismyvoice.com/';
  }

  render() {
    return <div />;
  }
}

export default Redirect;
