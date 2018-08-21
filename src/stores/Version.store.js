import $ from 'jquery';
import Const from './Const'


let _versions = {}
let _initCalled = false
let _changeListeners = []

const VersionStore = {

  init: function () {
    if (_initCalled)
      return

    _initCalled = true

    getJSON(function (err, res) {
      res.forEach(function (version) {
        if (version.iconId)
          version.iconUrl = Const.API+'/api/images/'+version.iconId
        else
          version.iconUrl = 'images/icon.png'

        _versions[version.uuid] = version
      })

      VersionStore.notifyChange()
    })
  },

  getVersions: function (applicationId) {
    const array = []

    for (const uuid in _versions)
      array.push(_versions[uuid])

    return array.sort(function(a, b) {
      if (a.version > b.version) {
        return -1;
      }
      if (a.version < b.version) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
  },

  getVersion: function (uuid) {
    return _versions[uuid]
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

function getJSON(cb) {
  $.ajax({
    url: Const.API+'/admin/versions',
    dataType: 'json',
    cache: false,
    headers: {
        'FIDELISA_PROVIDER': Const.PROVIDER,
        'FIDELISA_PROVIDER_KEY': Const.PROVIDER_KEY,
        'FIDELISA_APIUSER': Const.USER
    },
    success: function(data) {
      cb(null, data);
    },
    error: function(xhr, status, err) {
      cb(new Error(err.toString()));
    }
  });
}


export default VersionStore
