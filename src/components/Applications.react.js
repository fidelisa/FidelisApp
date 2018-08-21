import React from "react";
import $ from 'jquery';
import Nav from './Navigation.react'
import SearchBox from './SearchBox.react'

import ApplicationStore from '../stores/Application.store'
import ApplicationActions from '../actions/ApplicationActions'

import { Link } from 'react-router'

var Applications = React.createClass({
  getInitialState() {
    return ApplicationStore.getState();
  },

  componentDidMount() {
    ApplicationStore.listen(this.onChange);
    ApplicationActions.fetchApplications();
  },

  componentWillUnmount() {
    ApplicationStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },

  filterUpdate(filter) {
    ApplicationActions.updateFilter(filter);
  },

  generatorCheck(application, generator) {
    if (generator === '') {
      return true;
    } else if (generator[0] === '<' && generator[1] === '=') {
      let value = generator.slice(2);
      return application.version_generator <= value;
    } else if (generator[0] === '<') {
      let value = generator.slice(1);
      return application.version_generator < value;
    } else if (generator[0] === '>' && generator[1] === '=') {
      let value = generator.slice(2);
      return application.version_generator >= value;
    } else if (generator[0] === '>') {
      let value = generator.slice(1);
      return application.version_generator < value;
    } else if (generator[0] === '=') {
      let value = generator.slice(1);
      return application.version_generator === value;
    }
    return true;

  },

  render: function() {
    var input = this.state.filterText;
    const generatorCheck = this.generatorCheck;
    const applications = this.state.applications.map(function(application, cpt) {
      var query = input.query.toLowerCase();
      var status = input.status.toLowerCase();
      var generator = input.generator.toLowerCase();

      if (application.status.toLowerCase().indexOf(status) < 0
        || application.title.toLowerCase().indexOf(query) < 0
        || !generatorCheck(application, generator)
      ) {
        return;
      } else {
        return (
          <Link key={cpt} to={`applications/${cpt}`} activeClassName="active">
            <li>
              <div className="">
                <img className="app-icon" alt="Icon" src={application.iconUrl} />
              </div>
              <div className="info">
                  <div className="name">{application.title}</div>
                  <div className="status">{application.status}</div>
              </div>
            </li>
          </Link>
        )
      }
    })

    return (
      <div className="containers-body">
        <div className='sidebar'>
          <div className="sidebar-header">
            <SearchBox filterUpdate={this.filterUpdate}/>
          </div>
          <div className="sidebar-containers">
            <ul>
              {applications}
            </ul>
          </div>
          <div className="sidebar-buttons">

          </div>
        </div>
        <div className='details'>
          {this.props.children}
        </div>
      </div>
    );
  }
});


module.exports = Applications;
