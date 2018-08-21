import alt from '../alt';
let Promise = require('bluebird');
import $ from 'jquery';
import Const from '../stores/Const';
import FidelisaApi from '../api/FidelisaApi';

class ResellerActions {
  constructor () {
    this.generateActions(
      'updateResellers',
      'updateReseller'
    );
  }

  fetchResellers() {
    return (dispatch) => {
      // we dispatch an event here so we can have "loading" state.
      dispatch();
      FidelisaApi.requestResellers()
        .then((resellers) => {
          this.updateResellers(resellers);
        })
        .catch((errorMessage) => {
          console.log(errorMessage);
        });
      }
  }

  fetchReseller(id) {
    console.log(id);
    return (dispatch) => {
      // we dispatch an event here so we can have "loading" state.
      //dispatch();
      FidelisaApi.requestReseller(id)
        .then((reseller) => {
          this.updateReseller(reseller);
        })
        .catch((errorMessage) => {
          console.log(errorMessage);
        });
      }
  }
}



module.exports = alt.createActions(ResellerActions);
