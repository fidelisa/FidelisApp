import React from "react";
import $ from 'jquery';
import Nav from './Navigation.react'
import AccountItem from './AccountItem.react';
import AccountStore from '../stores/Account.store'

var Accounts = React.createClass({
  getInitialState() {
    return {
      accounts: this.getAccounts(),
      loading: true
    }
  },

  componentWillMount() {
    AccountStore.init()
  },

  componentDidMount() {
    AccountStore.addChangeListener(this.updateAccounts)
  },

  componentWillUnmount() {
    AccountStore.removeChangeListener(this.updateAccounts)
  },

  getAccounts() {
    return AccountStore.getAccounts().sort(function(a,b) { a.title < b.title });    
  },

  updateAccounts() {
    if (!this.isMounted())
      return

    this.setState({
      accounts: this.getAccounts(),
      loading: false
    })
  },

  render: function() {
    const accounts = this.state.accounts.map(function(account) {
      return (
        <div key={account.uuid} className="account-item pure-g">
          <div className="pure-u-3-4">
              <h5 className="account-name">{account.title}</h5>
              <h4 className="account-subject">{account.status}</h4>
          </div>
          <div className="pure-u">
            <div>V{account.version_app}</div>
          </div>

      </div>)
    })

    return (
      <div className="pure-g-r content" >
        <Nav />
        <div id='list' className="pure-u-1">
            {accounts}
        </div>
        {this.props.children}
      </div>
    );
  }
});


module.exports = Accounts;
