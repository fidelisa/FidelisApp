import React from "react";
import $ from 'jquery';
import { Link } from 'react-router'
import AccountStore from '../stores/Account.store'

var baseUrl = 'https://api.fidelisa.com';


var AccountItem = React.createClass({
  getStateFromStore(props) {
    const { uuid } = props ? props.data : this.props.data

    return {
      account: AccountStore.getAccount(uuid)
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
    let account = this.state.account;
    return (

      <div className="account-item pure-g">
          <div className="pure-u">
            <img className="account-avatar" alt="Icon" height="64" width="64" src={account.imageUrl} />
          </div>
          <div className="pure-u-3-4">
              <h5 className="account-name">{account.title}</h5>
              <h4 className="account-subject">{account.status}</h4>
          </div>
          <Link className="pure-u" to={`/application/${account.accountId}`} activeClassName="active">
            Plus
          </Link>
      </div>

    );
  }
});

// address1: "217, rue du faubourg saint honoré"
// address2: ""
// city: "PARIS"
// init_date: "2014-03-03"
// landing_page: nullnotes: ""
// pipe_amount: null
// pipe_level: 0
// reminder_status: null
// setup_date: null
// status: "Demo"
// subscription_date: null
// title: "Démonstration"
// type: "Multi"
// uuid: "617B86827663488393FDB6466373CA4F"
// vendors_count: "3"
// version_app: "2"
// zipcode: "75008"

module.exports = AccountItem;
