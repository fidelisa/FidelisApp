import alt from '../alt';
let Promise = require('bluebird');
import $ from 'jquery';
import Const from '../stores/Const';
import FidelisaApi from '../api/FidelisaApi';

class AccountActions {
  constructor () {
    this.generateActions(
      'updateAccounts',
      'updateAccount'
    );
  }

  fetchAccounts() {
    return (dispatch) => {
      // we dispatch an event here so we can have "loading" state.
      dispatch();
      FidelisaApi.requestAccounts()
        .then((accounts) => {
          this.updateAccounts(accounts);
        })
        .catch((errorMessage) => {
          console.log(errorMessage);
        });
      }
  }


  fetchAccount(id) {
    return (dispatch) => {
      // we dispatch an event here so we can have "loading" state.
      dispatch();
      FidelisaApi.requestAccount(id)
        .then((account) => {
          this.updateAccount(account);
        })
        .catch((errorMessage) => {
          console.log(errorMessage);
        });
      }
  }

}



module.exports = alt.createActions(AccountActions);
