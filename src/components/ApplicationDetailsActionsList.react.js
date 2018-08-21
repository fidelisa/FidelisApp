import React from "react";
import $ from 'jquery';
import ApplicationStore from '../stores/Application.store';
import Const from '../stores/Const';
import Versions from './Versions.react';
import ApplicationShell from './ApplicationShell.react';

let actionsList = {
  "start": {
    'Tout': 'start',
    'Tout': 'startapp',
    'IOS': 'startios',
    'ANDROID': 'startandroid',
    'HTML5': 'startbrowser'
  },

  "done" : {
    'IOS': 'doneios',
    'ANDROID': 'doneandroid',
    'HTML5': 'donebrowser'
  },

  "build" : {
    'resources': 'resources',
    'buildios': 'buildios',
    'buildandroid': 'buildandroid',
    'buildbrowser': 'buildbrowser'
  },

  "test" : {
    'test': 'test',
    'starttest': 'starttest',
    'version': 'version'
  },

  "slack" : {
    'sendresume': 'sendresume'
  },

  "mark" : {
    'done': 'markdone',
    'pending': 'markpending',
    'ios': 'markdoneios',
    'android': 'markdoneandroid',
    'browser': 'markdonebrowser'
  },

  "publication" : {
    'prepios' : 'prepios',
    'prepandroid' : 'prepandroid',
    'ios' : 'pubios',
    'android' : 'pubandroid',
    'browser' : 'pubbrowser',
    'pemios' : 'pemios'
  },

  "init" : {
    'initios' : 'initios',
    'initandroid' : 'initandroid'
  }
};

var SubAction = React.createClass({
  render: function () {
    let actionsArray = []
    for (const name in this.props.menu.actions)
      actionsArray.push({"name":  name, "action": actionsList[this.props.name][name]})


    let actions = actionsArray.map((l) =>
      <div key={this.props.name+'_'+l.name}><ApplicationShell application={this.props.application} action={l.action} statusName={l.name}/></div>
    )

    return (
      <div>
        {actions}
      </div>
    )
  }
});



var ApplicationDetailsActionsList = React.createClass({

  click: function(l) {
    l.show = !l.show;
  },

  render: function () {
    let actionsArray = []
    for (const name in actionsList) {
      actionsArray.push({"name":  name, "actions": actionsList[name]})
      actionsList.show = false;
    }



    let actions = actionsArray.map((l) =>
      <div key={l.name}>
        <div onClick={this.click.bind(this,l)}>{l.name}</div>
        <SubAction menu={l} name={l.name} application={this.props.application}/>
      </div>
    )

    return (
      <div className='wrapper2'>
        <div className='widget'>
          {actions}
        </div>
      </div>
    );
  }
});

module.exports = ApplicationDetailsActionsList;
