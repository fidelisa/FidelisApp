import $ from 'jquery';
import Const from './Const';
import FidelisaApi from '../api/FidelisaApi';

let _accounts = {}
let _initCalled = false
let _changeListeners = []

const AccountStore = {

  init: function () {
    if (_initCalled)
      return

    _initCalled = true

    FidelisaApi.requestAccounts()
    .then(function(data) {
      data.forEach(function (account) {
          _accounts[account.uuid] = account
      })
      AccountStore.notifyChange()

    })
  },

  getAccounts: function (version_app) {
    const array = []

    for (const uuid in _accounts) {
        array.push(_accounts[uuid])
    }

    return array;
  },

  getAccount: function (uuid) {
    if (_accounts[uuid]) {
      return _accounts[uuid];
    } else {
      FidelisaApi.requestAccount(uuid)
      .then(function(account) {
        _accounts[account.uuid] = account
        AccountStore.notifyChange()
      })
    }

    // console.log("getAccount", uuid, _accounts);
    // return _accounts[uuid];
  },

  notifyChange: function () {
    _changeListeners.forEach(function (listener) {
      listener()
    })
  },

  addChangeListener: function (listener) {
    _changeListeners.push(listener)
  },

  removeChangeListener: function (listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return listener !== l
    })
  }

}

export default AccountStore
