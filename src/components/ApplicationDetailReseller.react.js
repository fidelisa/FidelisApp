import React from "react";
import $ from 'jquery';
import { Link } from 'react-router'
import ResellerStore from '../stores/Reseller.store'
import ResellerActions from '../actions/ResellerActions'
import ClipboardLabel from './ClipboardLabel.react'

var baseUrl = 'https://api.fidelisa.com';


var ApplicationDetailReseller = React.createClass({
  getStateFromStore(props) {
    const { uuid } = props ? props.data : this.props.data
    let reseller = ResellerStore.getReseller(uuid);

    return {
      reseller: reseller
    }
  },

  getInitialState() {
    return this.getStateFromStore()
  },

  componentDidMount() {
    ResellerStore.listen(this.onChange);
  },

  componentWillUnmount() {
    ResellerStore.unlisten(this.onChange);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.uuid) {
      ResellerActions.fetchReseller(nextProps.data.uuid);
      this.setState(this.getStateFromStore(nextProps))
    }
  },

  updateReseller() {
    if (!this.isMounted())
      return

    this.setState(this.getStateFromStore())
  },

  onChange(state) {
    this.setState(this.getStateFromStore())
  },

  render: function() {
    let reseller = this.state.reseller || {};
    return (
      <div>
        {reseller.title}: <span className="subtitle"><ClipboardLabel value={reseller.uuid}/></span>
      </div>

    );
  }
});
module.exports = ApplicationDetailReseller;
