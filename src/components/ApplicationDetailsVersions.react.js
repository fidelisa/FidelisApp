import React from "react";
import $ from 'jquery';
import ApplicationStore from '../stores/Application.store'
import Const from '../stores/Const'
import Versions from './Versions.react'
import ApplicationDone from './ApplicationDone.react'
import ApplicationPreview from './ApplicationPreview.react'

var ApplicationDetails = React.createClass({

  render: function() {
    if (!this.props.application) {
      return (
        <div></div>
      );
    }

    const application = this.props.application
    return (
      <div className="settings-panel">
        <Versions application={application} />
      </div>
    );
  }
});

module.exports = ApplicationDetails;
