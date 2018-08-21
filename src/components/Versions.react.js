import React from "react";
import $ from 'jquery';
import SearchBox from './SearchBox.react'
import VersionStore from '../stores/Version.store'

import { Link } from 'react-router'

var Versions = React.createClass({
  getInitialState() {
    return {
      versions: VersionStore.getVersions(),
      loading: true
    }
  },

  componentWillMount() {
    VersionStore.init()
  },

  componentDidMount() {
    VersionStore.addChangeListener(this.updateVersions)
  },

  componentWillUnmount() {
    VersionStore.removeChangeListener(this.updateVersions)
  },

  updateVersions() {
    if (!this.isMounted())
      return

    this.setState({
      versions: VersionStore.getVersions(),
      loading: false
    })
  },

  stateUpdate(value) {
    this.setState({
      filterText: value
    });
  },

  render: function() {
    const application = this.props.application || { uuid: "" }
    const versions = this.state.versions.map(function(version) {
      if (version.application_id !== application.uuid) {
        return;
      } else {
        return (
          <tr key={version.uuid}>
            <td>{version.created_at}</td>
            <td>{version.version}</td>
            <td>{version.version_generator}</td>
            <td>{version.version_code}</td>
            <td>{version.appstore ? 'X' : ''}</td>
            <td>{version.googleplay ? 'X' : ''}</td>
          </tr>
        )
        //   <div >
        //     <div>{version.uuid}</div>
        //     <div>{application.uuid}</div>
        //     <div>{version.application_id}</div>
        //     <div></div>
        //     <div>{version.version_generator}</div>
        //     <div>{version.appstore}</div>
        //     <div>{version.googleplay}</div>
        //     <div>{version.created_at}</div>
        //     <div>{version.updated_at}</div>
        //     <div>{version.version_code}</div>
        //     <div>{version.iconUrl}</div>
        // </div>)
      }
    })

    return (
      <table className="main-table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Version</th>
                <th>Generator</th>
                <th>Code</th>
                <th>Apple</th>
                <th>Google</th>
            </tr>
        </thead>
        <tbody>
          {versions}
        </tbody>
      </table>
    );
  }
});


module.exports = Versions;
