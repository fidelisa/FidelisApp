import React from "react";
import ApplicationStore from '../stores/Application.store'
// const {shell} = require('electron');
const spawn = require('child_process').spawn;

var OpenFolder = React.createClass({

  click:function() {
    var filename = "/Users/yann/bin/app-builds/production/builds/"+this.props.value+"/.";
    const sp = spawn('open', [filename], {
      detached: true,
      stdio: ['ignore']
    });

    sp.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    sp.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    sp.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });


  },

  render:function(){
      return (
        <button onClick={this.click}>{this.props.valueLabel}</button>
      )
  }
});


module.exports = OpenFolder;
