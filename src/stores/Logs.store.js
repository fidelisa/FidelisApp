import alt from '../alt';
import LogsActions from '../actions/LogsActions'


export class LogsStore {
  constructor() {
    this.bindActions(LogsActions);

    // this.bindListeners({
    //   handleFetchCompil: LogsActions.fetchCompil
    // });

    this.shell = [];
    this.compil= [];
    this.filter = [];
    this.levels = [];

    this.bindListeners({
      handleFetchCompil: LogsActions.FETCH_COMPIL
    });
  }

  handleUpdateShell(shell) {
    console.log("onUpdateShell");
    this.setState({ shell });
  }

  onUpdateCompil(compil) {
    console.log("onUpdateCompil");
    // this.compil = compil;
    this.setState({ compil });
  }

  handleFetchCompil() {
    this.compil = [];
    console.log("handleFetchCompil");
  }

  onUpdateFilter(filter) {
    this.filter = filter;
  }

  onUpdateLevels(levels) {
    this.levels = levels;
  }

}

export default alt.createStore(LogsStore, 'LogsStore');
