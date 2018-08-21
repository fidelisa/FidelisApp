import React from "react";
import $ from 'jquery';

import { Link } from 'react-router'

var Features = React.createClass({

  render: function() {
    const application = this.props.application || {}
    const features = application.features || [];
    const features_map = features.map(function(feature) {
      if (feature.active) {
        return (
          <span key={feature.name}>{feature.name}</span>
        )
      } else {
        return;
      }
    })

    return (
      <div className="main-table">
        <div className="title">Features</div>
        <div className="features">{features_map}</div>
      </div>
    );
  }
});


module.exports = Features;
