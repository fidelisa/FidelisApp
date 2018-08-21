import alt from '../alt';
let Promise = require('bluebird');
import $ from 'jquery';
import Const from '../stores/Const';
import FidelisaApi from '../api/FidelisaApi';

class ApplicationActions {
  constructor () {
    this.generateActions(
      'updateApplications',
      'updateApplication',
      'updateFilter',
      'logs',
      'compilLogs'
    );
  }


  fetchApplications() {
    return (dispatch) => {
      // we dispatch an event here so we can have "loading" state.
      dispatch();
      FidelisaApi.requestApplications()
        .then((applications) => {
          this.updateApplications(applications);
        })
        .catch((errorMessage) => {
          console.log(errorMessage);
        });
      }
  }


  fetchApplication(id) {
    return (dispatch) => {
      // we dispatch an event here so we can have "loading" state.
      dispatch();
      FidelisaApi.requestApplication(id)
        .then((application) => {
          this.updateApplication(application);
        })
        .catch((errorMessage) => {
          console.log(errorMessage);
        });
      }
  }

  updateApplication(appID, data) {
    return data;
  }

}



module.exports = alt.createActions(ApplicationActions);
