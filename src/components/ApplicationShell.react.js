import React from "react";
import ApplicationStore from '../stores/Application.store';
const spawn = require('child_process').spawn;
import ApplicationActions from '../actions/ApplicationActions';


var ApplicationShell = React.createClass({

  click:function() {

    var application = this.props.application;
    var cpt = 0;

    // var filename = "/Users/yann/bin/app-builds/production/builds/"+this.props.value+"/.";
    const sp = spawn('node', ['main.js', 'compiler', '-e', 'production', '-v', '--account', application.account_id,  '-a', this.props.action], {
      detached: true,
      stdio: ['ignore'],
      cwd: '/Users/yann/bin/app-builds'
    });


    application.Logs = [];

    sp.stdout.on('data', (data) => {
      let str = `${cpt} ${data}`;
      application.Logs.push(str);
      ApplicationActions.updateApplication(application);
      cpt++;
    });

    sp.stderr.on('data', (data) => {
      let str = `${cpt} ${data}`;
      application.Logs.push(str);
      ApplicationActions.updateApplication(application);
      cpt++;
    });

    sp.on('close', (code) => {
      let str = `${cpt} child process exited with code ${code}`;
      application.Logs.push(str);
      ApplicationActions.updateApplication(application);
    });

  },

  render:function(){
      return (
        <button className="pure-button" onClick={this.click}>{this.props.statusName}</button>
      )
  }
});


module.exports = ApplicationShell;
