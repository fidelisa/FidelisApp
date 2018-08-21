import React from "react";
import $ from 'jquery';
import Convert from 'ansi-to-html';

import LogsStore from '../stores/Logs.store'
import LogsActions from '../actions/LogsActions'

let escape = function (html) {
  var text = document.createTextNode(html);
  var div = document.createElement('div');
  div.appendChild(text);
  var retString = div.innerHTML;
  retString = retString.replace(/ /g, '&nbsp;<wbr>')
  retString = retString.replace(/(?:\r\n|\r|\n)/g, '<br />');
  return retString;
};

let reduceLevel = function (data) {
  var ret = [];
  data.forEach(function (element) {
    if (ret.indexOf(element.level) < 0) {
      ret.push(element.level);
    }
  });
  return ret;
}

let convert = new Convert();

var ApplicationDetailsLogs = React.createClass({
  getInitialState() {
    return LogsStore.getState();
  },

  componentDidMount() {
    LogsStore.listen(this.onChange);
    if (this.props.application) {
      LogsActions.fetchCompil(this.props.application.account_id);
    }
  },

  componentWillUnmount() {
    LogsStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },

  handleStatus: function (status) {
    var filter = this.state.filter || [];
    var idx = filter.indexOf(status);
    if (idx < 0) {
      filter.push(status);
    } else {
      filter.splice(idx, 1);
    }
    LogsActions.updateFilter(filter);
  },

  render: function () {
    var self = this;
    var filter = this.state.filter || [];

    let logs = this.state.compil.map(function (l, i) {
      if (filter.indexOf(l.level) < 0) {
        return
      } else {
        return (<div key={i} dangerouslySetInnerHTML={{ __html: convert.toHtml(escape(l.message)) }}></div>)
      }
    });

    let levels = this.state.levels.map((l) =>
        <span key={l}>
          <input type="checkbox" name={`myRadio-${l}`} onChange={self.handleStatus.bind(null, l)} />
          <label for={`myRadio-${l}`}>{l}</label>
        </span>
      );

    return (
      <div className="action-panel">
        <div className='content'>
          <div className="full">
            <div className="action-logs">
              <div className="mini-logs wrapper">
                <div className="widget">
                  <div className="top-bar">
                    <div className="text">Application  Logs</div>
                  </div>
                  <div className="logs-filter">
                    {levels}
                  </div>
                  <div className="logs">
                    {logs}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ApplicationDetailsLogs;
