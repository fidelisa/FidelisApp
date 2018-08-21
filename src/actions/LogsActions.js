import alt from '../alt';
import $ from 'jquery';
import Const from '../stores/Const';
import FidelisaApi from '../api/FidelisaApi';

let Promise = require('bluebird');
let fs = require('fs');


export class LogsActions {
  constructor() {
    this.generateActions('updateShell', 'updateCompil', 'updateFilter' , 'updateLevels');
  }

  fetchCompil(id) {
    let self = this;
    return (dispatch) => {
      // we dispatch an event here so we can have "loading" state.
      dispatch();
      let filename = "/Users/yann/bin/app-builds/production/builds/"+id+"/compiler.log";

      fs.readFile(filename, 'utf8', function (err, data) {
        if (err) return console.log(err);
        let sData = data.split('\n');
        let tab = [];
        let levels = [];
        sData.forEach(function(j) {
          try {
            data = JSON.parse(j)
            tab.push(data);
            if (levels.indexOf(data.level) < 0) {
              levels.push(data.level);
            }
          }
          catch(err) {
          }
        })
        self.updateCompil(tab);
        self.updateLevels(levels);
      });
    }
  }

}

export default alt.createActions(LogsActions);
