import alt from '../alt';
import ApplicationActions from '../actions/ApplicationActions'

// let _applications = {}
// let _initCalled = false
// let _changeListeners = []

class ApplicationStore {

  constructor() {

    this.bindActions(ApplicationActions);

    this.applications = [];
    this.filterText = {
      query: '',
      status: '',
      generator: ''
    };

    this.bindListeners({
      handleFetchApplications: ApplicationActions.FETCH_APPLICATIONS,
      handleFetchApplication: ApplicationActions.FETCH_APPLICATION,
      handleUpdateApplications: ApplicationActions.UPDATE_APPLICATIONS,
      handleUpdateApplication: ApplicationActions.UPDATE_APPLICATION
    });

  }

  findApplication(uuid) {
    this.applications.forEach((application) => {
      if (application.uuid === uuid) return application
    });
  }

  onUpdateApplication(update) {
    //nothing
    console.log("update ApplicationStore", update);
  }

  onUpdateFilter(update) {
    this.filterText = update;
  }

  onLogs({
    id,
    entry
  }) {
    let application = this.findApplication(id)
    application.Logs.push(entry);
  }

  onCompileLogs({
    id,
    entry
  }) {
    let application = this.findApplication(id)
    application.Logs.push(entry);
  }

  handleFetchApplications() {
    this.applications = [];
    console.log("handleFetchApplications");
  }

  handleFetchApplication() {
    console.log("handleFetchApplication");
  }

  handleUpdateApplications(applications) {
    this.applications = applications;
    console.log("handleUpdateApplications");
  }

  handleUpdateApplication(newApplication) {
    console.log("handleUpdateApplication", newApplication);
    let index = -1;

    this.applications.forEach((application, idx) => {
      if (application.uuid === newApplication.uuid) {
        index = idx;
      }
    });

    if (index >= 0) {
      this.applications[index] = newApplication;
    }
  }


}
module.exports = alt.createStore(ApplicationStore, 'ApplicationStore');
