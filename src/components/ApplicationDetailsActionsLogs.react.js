import React from "react";
import $ from 'jquery';
import ApplicationStore from '../stores/Application.store';
import Const from '../stores/Const';
import Versions from './Versions.react';
import ApplicationShell from './ApplicationShell.react';

import Convert from 'ansi-to-html';

let escape = function (html) {
  var text = document.createTextNode(html);
  var div = document.createElement('div');
  div.appendChild(text);
  return div.innerHTML;
};

let convert = new Convert();

var ApplicationDetailsActionsLogs = React.createClass({

  render: function () {
    let logs = this.props.application.Logs ?
      this.props.application.Logs.map((l) => <div key={l.substr(0,l.indexOf(' '))} dangerouslySetInnerHTML={{__html: convert.toHtml(escape(l.substr(l.indexOf(' ')+1)).replace(/ /g, '&nbsp;<wbr>'))}}></div>) :
        ['0 No logs for this container.'];
    return (
      <div className="mini-logs wrapper">
        <div className="widget">
          <div className="top-bar">
            <div className="text">Application  Logs</div>
          </div>
          <div className="logs">
            {logs}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ApplicationDetailsActionsLogs;
