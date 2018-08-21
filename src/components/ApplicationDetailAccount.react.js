import React from "react";
import $ from 'jquery';
import { Link } from 'react-router'
import AccountStore from '../stores/Account.store'
import ApplicationDetailReseller from './ApplicationDetailReseller.react'

var baseUrl = 'https://api.fidelisa.com';


var ApplicationDetailAccount = React.createClass({
  getStateFromStore(props) {
    const { uuid } = props ? props.data : this.props.data
    let account = uuid ? AccountStore.getAccount(uuid) : {};
    return {
      account: account
    }
  },

  getInitialState() {
    return this.getStateFromStore()
  },

  componentDidMount() {
    AccountStore.addChangeListener(this.updateAccount)
  },

  componentWillUnmount() {
    AccountStore.removeChangeListener(this.updateAccount)
  },

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromStore(nextProps))
  },

  updateAccount() {
    if (!this.isMounted())
      return

    this.setState(this.getStateFromStore())
  },

  render: function() {
    let account = this.state.account || {};
    const reseller = { uuid: account.reseller_id }
    return (

      <div>
        <ApplicationDetailReseller data={reseller}/>
      </div>

    );
  }
});
module.exports = ApplicationDetailAccount;
