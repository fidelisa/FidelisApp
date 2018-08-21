import alt from '../alt';
import ResellerActions from '../actions/ResellerActions'


class ResellerStore {

  constructor() {

    this.bindActions(ResellerActions);

    this.resellers = [];

    this.bindListeners({
      handleFetchResellers: ResellerActions.FETCH_RESELLERS,
      handleFetchReseller: ResellerActions.FETCH_RESELLER,
      handleUpdateResellers: ResellerActions.UPDATE_RESELLERS,
      handleUpdateReseller: ResellerActions.UPDATE_RESELLER
    });

    this.exportPublicMethods({
      getReseller: this.getReseller
    });

  }

  onUpdateReseller(update) {
    //nothing
    console.log("update ResellerStore", update);
  }

  handleFetchResellers() {
    this.resellers = [];
    console.log("handleFetchResellers");
  }

  handleFetchReseller() {
    console.log("handleFetchReseller");
  }

  handleUpdateResellers(resellers) {
    this.resellers = resellers;
    console.log("handleUpdateResellers");
  }

  handleUpdateReseller(newReseller) {
    console.log("handleUpdateReseller", newReseller);
    let index = -1;

    this.resellers.forEach((reseller, idx) => {
      if (reseller.uuid === newReseller.uuid) {
        index = idx;
      }
    });

    if (index >= 0) {
      this.resellers[index] = newReseller;
    } else {
      this.resellers.push(newReseller);
    }
  }

  getReseller(uuid) {
    var { resellers } = this.getState();
    for (var i = 0; i < resellers.length; i += 1) {
      if (resellers[i].uuid === uuid) {
        return resellers[i];
      }
    }

    return null;
  }


}
module.exports = alt.createStore(ResellerStore, 'ResellerStore');
