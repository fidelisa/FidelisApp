import React from "react";
import $ from 'jquery';
import ApplicationStore from '../stores/Application.store'
import Const from '../stores/Const'
import Versions from './Versions.react'


var ApplicationPreview = React.createClass({

  render: function() {
    const link = Const.APP+"/"+this.props.appId
    const mystyle = {
      width: '375px',
      height: '667px',
      borderWidth: '0px'
    }
    return (
      <div className="preview-container">
        <div className="preview-box">
          <iframe frameBorder="0" style={mystyle} src={link}></iframe>
        </div>
      </div>

    );
  }
});

module.exports = ApplicationPreview;
