import React from "react";

import Nav from './Navigation.react'

var App = React.createClass({
  render: function(){
    return (
      <div className="pure-g-r content" >
        <Nav />
        {this.props.children}
      </div>
      )
  }
});



module.exports = App;
