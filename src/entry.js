require('../css/animate.min.css');
require('../css/toastr.min.css');

require('../styles/main.less');

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link, Redirect, IndexRedirect, hashHistory } from 'react-router'

import App from './components/App.react'
import Accounts from './components/Accounts.react'
import Applications from './components/Applications.react'
import ApplicationDetails from './components/ApplicationDetails.react'
import ApplicationDetailsGeneral from './components/ApplicationDetailsGeneral.react'
import ApplicationDetailsVersions from './components/ApplicationDetailsVersions.react'
import ApplicationDetailsPreview from './components/ApplicationDetailsPreview.react'
import ApplicationDetailsActions from './components/ApplicationDetailsActions.react'
import ApplicationDetailsApplication from './components/ApplicationDetailsApplication.react'
import ApplicationDetailsLogs from './components/ApplicationDetailsLogs.react'


var routes = (
  <Router history={hashHistory}>
    <Route name="app" path='/' component={Applications}>
      <Route name="application" path="applications/:id" component={ApplicationDetails}>
        <IndexRedirect to="general" />
        <Route name="detailsGeneral" path="general" component={ApplicationDetailsGeneral}/>
        <Route name="detailsVersions" path="versions" component={ApplicationDetailsVersions}/>
        <Route name="detailsPreview" path="preview" component={ApplicationDetailsPreview}/>
        <Route name="detailsActions" path="actions" component={ApplicationDetailsActions}/>
        <Route name="detailsActions" path="actions" component={ApplicationDetailsActions}/>
        <Route name="detailsApplication" path="application" component={ApplicationDetailsApplication}/>
        <Route name="detailsLogs" path="logs" component={ApplicationDetailsLogs}/>
      </Route>
    </Route>
  </Router>
);

ReactDOM.render(routes,document.getElementById('app'));
//
// Router.run(routes, function(Handler){
//   render(<Handler/>, document.getElementById('layout'));
// });
