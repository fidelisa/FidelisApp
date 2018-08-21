import React from "react";
import ApplicationStore from '../stores/Application.store'
const {clipboard} = require('electron');

var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

var ClipboardLabel = React.createClass({

  click:function() {
    clipboard.writeText(this.props.value);
    // alert('Copy to clipboard:'+this.props.value);
    this.refs.container.success(`Copy to clipboard: ${this.props.value}`, `Copy to clipboard`, {
      closeButton: true,
    });
  },

  render:function(){
      return (
        <div onClick={this.click}>
          <span>{this.props.value}</span>
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="container"
            className="toast-top-right"
          />
        </div>
      )
  }
});


module.exports = ClipboardLabel;
