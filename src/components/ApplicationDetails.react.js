import React from "react";
import $ from 'jquery';
import ApplicationStore from '../stores/Application.store'
import Const from '../stores/Const'
import Versions from './Versions.react'
import ApplicationDone from './ApplicationDone.react'
import ApplicationPreview from './ApplicationPreview.react'
import ApplicationActions from '../actions/ApplicationActions'
import ApplicationDetailAccount from './ApplicationDetailAccount.react';

import AccountStore from '../stores/Account.store'

import { Link } from 'react-router'

var ApplicationDetails = React.createClass({

  getStateFromStore(props) {
    const { id } = props ? props.params : this.props.params
    let applications = ApplicationStore.getState().applications;
    
    return {
      application: applications[id],
      id: id
    }
  },

  getInitialState() {
    return this.getStateFromStore()
  },

  componentDidMount() {
    ApplicationStore.listen(this.updateApplication)
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount() {
    ApplicationStore.unlisten(this.updateApplication)
    window.removeEventListener('resize', this.handleResize);
  },

  handleResize: function () {
    $('.settings-panel').height(window.innerHeight - 60);
    $('.action-panel').height(window.innerHeight - 60);
    $('.wrapper').height(window.innerHeight - 176);
    $('.wrapper2').height(window.innerHeight - 136);
  },

  componentDidUpdate: function () {
      this.handleResize();
    },

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromStore(nextProps))
  },

  updateApplication() {
    if (!this.isMounted())
      return

    this.setState(this.getStateFromStore())
  },

  refresh:function(id) {
    ApplicationActions.fetchApplication(id);
  },

  render: function() {
    const application = this.state.application || {}
    const account = this.state.account || { uuid: application.account_id }
    return (
      <div className="details-panel">
        <div className="infos">
          <div className="settings-menu">
            <img className="refresh" onClick={this.refresh.bind(this,application.uuid)} src="images/iu.jpeg" />
            <div className="name">{application.title}</div>
            <ul>
            <Link to={`/applications/${this.state.id}/general`}>
              <li>
                General
              </li>
            </Link>
            <Link to={`/applications/${this.state.id}/preview`}>
              <li>
                Preview
              </li>
            </Link>
            <Link to={`/applications/${this.state.id}/versions`}>
              <li>
                Versions
              </li>
            </Link>
            <Link to={`/applications/${this.state.id}/actions`}>
              <li>
                Actions
              </li>
            </Link>
            <Link to={`/applications/${this.state.id}/logs`}>
              <li>
                Logs
              </li>
            </Link>
            </ul>
          </div>
          <div className="info">
            <ApplicationDetailAccount data={account}/>
          </div>

          {this.props.children && React.cloneElement(this.props.children, {
              application: this.state.application
            })}
        </div>
      </div>

    );
  }
});

module.exports = ApplicationDetails;
