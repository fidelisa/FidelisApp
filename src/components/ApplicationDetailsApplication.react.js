import React from "react";
import $ from 'jquery';
import ApplicationStore from '../stores/Application.store';
import Features from './Features.react'

var ApplicationDetailsApplication = React.createClass({
  render: function () {
    if (!this.props.application) {
      return (
        <div></div>
      );
    }

    const options = this.props.application.app;
    const test = JSON.stringify(options);
    return (
      <div className="settings-panel">
        <Features application={options} />
      </div>
    );
  }
});

module.exports = ApplicationDetailsApplication;
