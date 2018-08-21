import React from "react";
import ApplicationActions from '../actions/ApplicationActions'

var ApplicationDone = React.createClass({

  getInitialState() {
    var name = this.props.statusValue || 'Done';
    return {
      statusName: this.props.statusName,
      statusValue:  name
    };
  },

  click:function() {
    var data = { application: {} };
    data.application[this.state.statusName] = this.state.statusValue;
    ApplicationActions.updateApplication(this.props.appId, data);
  },

  render:function(){
      return (
        <button className="pure-button" onClick={this.click}>{this.state.statusValue}</button>
      )
  }
});


module.exports = ApplicationDone;
