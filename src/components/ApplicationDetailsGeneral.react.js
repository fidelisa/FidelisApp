import React from "react";

import ApplicationDone from './ApplicationDone.react'
import ClipboardLabel from './ClipboardLabel.react'
import OpenFolder from './OpenFolder.react'

import Versions from './Versions.react'
import Features from './Features.react'

const electron = require('electron');

var ApplicationDetailsGeneral = React.createClass({

  render: function() {
    if (!this.props.application) {
      return (
        <div></div>
      );
    }

    const application = this.props.application;
    const account = this.props.account;
    return (
      <div className="settings-panel">
        <table className="main-table">
          <thead></thead>
          <tbody>
            <tr><td>name</td><td><ClipboardLabel value={application.app.name}/></td><td></td></tr>
            <tr><td>application</td><td><ClipboardLabel value={application.uuid}/></td><td></td></tr>
            <tr><td>account</td><td><ClipboardLabel value={application.account_id}/></td><td><OpenFolder value={application.account_id} valueLabel="Open"/></td></tr>
            <tr><td>url Privacy</td><td><ClipboardLabel value={application.url_privacy}/></td><td></td></tr>
            <tr><td>url</td><td><ClipboardLabel value={application.app.url}/></td><td></td></tr>
            <tr><td>icon</td><td><ClipboardLabel value={application.iconUrl+'.png?static=t'}/></td><td></td></tr>
            <tr><td>status</td><td>{application.status}</td><td><ApplicationDone appId={application.uuid} statusName="status"/><ApplicationDone appId={application.uuid} statusName="status" statusValue="Pending"/></td></tr>
            <tr><td>identifiant</td><td>com.fidelisa.app{application.uuid}</td><td></td></tr>
            <tr><td>Version</td><td>{application.version_major}.{application.version_minor}.{application.version_build}</td><td></td></tr>
            <tr><td>Code</td><td>{application.version.next_version.version_code}</td><td></td></tr>
            <tr><td>Generator</td><td>{application.version_generator}</td><td></td></tr>
            <tr><td>Ios</td><td>{application.ios}</td><td><ApplicationDone appId={application.uuid} statusName="ios"/></td></tr>
            <tr><td>Android</td><td>{application.android}</td><td><ApplicationDone appId={application.uuid} statusName="android"/></td></tr>
            <tr><td>Html5</td><td>{application.browser}</td><td><ApplicationDone appId={application.uuid} statusName="browser"/></td></tr>
            <tr><td>Description</td><td><ClipboardLabel value={application.app.description.replace('\\n', '\n')}/></td><td></td></tr>
            <tr><td>Author</td><td><ClipboardLabel value={application.app.author.email}/></td><td></td></tr>
            <tr><td>Mise à jour</td><td>{application.updated_at}</td><td></td></tr>
          </tbody>
        </table>
        <Features application={application.app} />
        <Versions application={application} />
      </div>
    );
  }
});

module.exports = ApplicationDetailsGeneral;
