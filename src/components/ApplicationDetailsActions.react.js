import React from "react";
import $ from 'jquery';
import ApplicationStore from '../stores/Application.store'
import Const from '../stores/Const'
import Versions from './Versions.react'
import ApplicationShell from './ApplicationShell.react'
import ApplicationDetailsActionsLogs from './ApplicationDetailsActionsLogs.react'
import ApplicationDetailsActionsList from './ApplicationDetailsActionsList.react'


var ApplicationDetailsActions = React.createClass({

  render: function() {
    if (!this.props.application) {
      return (
        <div></div>
      );
    }

    const application = this.props.application
    const id = this.props.params.id;
    return (
      <div className="action-panel">
        <div className='content'>
          <div className="left">
            <div className="action-logs">
              <ApplicationDetailsActionsLogs application={application} />
            </div>
          </div>
          <div className="right">
            <ApplicationDetailsActionsList application={application} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ApplicationDetailsActions;
