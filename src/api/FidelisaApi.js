import Promise from 'bluebird';
import $ from 'jquery';
import Const from '../stores/Const'

class FidelisaApi {

  static requestAccounts() {
    return new Promise((resolve, reject) => {

      var url = Const.API+'/api/accounts';
      $.ajax({
        url: url,
        dataType: 'json',
        cache: false,
        headers: {
            'FIDELISA_PROVIDER': Const.PROVIDER,
            'FIDELISA_PROVIDER_KEY': Const.PROVIDER_KEY,
            'FIDELISA_APIUSER': Const.USER
        },
        success: (data) => {
          resolve(data);
        },
        error: function(xhr, status, err) {
          reject(err);
        }
      });

    });
  }

  static requestAccount(id) {
    return new Promise((resolve, reject) => {

      var url = `${Const.API}/api/accounts/${id}`;
      $.ajax({
        url: url,
        dataType: 'json',
        cache: false,
        headers: {
            'FIDELISA_PROVIDER': Const.PROVIDER,
            'FIDELISA_PROVIDER_KEY': Const.PROVIDER_KEY,
            'FIDELISA_APIUSER': Const.USER
        },
        success: (application) => {
          resolve(application);
        },
        error: function(xhr, status, err) {
          reject(err);
        }
      });

    });
  }

  static requestResellers() {
    return new Promise((resolve, reject) => {

      var url = Const.API+'/api/resellers';
      $.ajax({
        url: url,
        dataType: 'json',
        cache: false,
        headers: {
            'FIDELISA_PROVIDER': Const.PROVIDER,
            'FIDELISA_PROVIDER_KEY': Const.PROVIDER_KEY,
            'FIDELISA_APIUSER': Const.USER
        },
        success: (data) => {
          resolve(data);
        },
        error: function(xhr, status, err) {
          reject(err);
        }
      });

    });
  }

  static requestReseller(id) {
    return new Promise((resolve, reject) => {

      var url = `${Const.API}/api/resellers/${id}`;
      $.ajax({
        url: url,
        dataType: 'json',
        cache: false,
        headers: {
            'FIDELISA_PROVIDER': Const.PROVIDER,
            'FIDELISA_PROVIDER_KEY': Const.PROVIDER_KEY,
            'FIDELISA_APIUSER': Const.USER
        },
        success: (application) => {
          resolve(application);
        },
        error: function(xhr, status, err) {
          reject(err);
        }
      });

    });
  }

  static requestApplications() {
    return new Promise((resolve, reject) => {

      var url = Const.API+'/admin/applications';
      $.ajax({
        url: url,
        dataType: 'json',
        cache: false,
        headers: {
            'FIDELISA_PROVIDER': Const.PROVIDER,
            'FIDELISA_PROVIDER_KEY': Const.PROVIDER_KEY,
            'FIDELISA_APIUSER': Const.USER
        },
        success: (data) => {
          data.forEach((application) => {
            application.url_privacy = "https://api.fidelisa.com/privacy_policy?app_id="+application.account_id;
            if (application.iconId)
              application.iconUrl = Const.API+'/api/images/'+application.iconId
            else
              application.iconUrl = 'images/icon.png'
          });
          resolve(data);
        },
        error: function(xhr, status, err) {
          reject(err);
        }
      });

    });
  }

  static requestApplication(id) {
    return new Promise((resolve, reject) => {

      var url = `${Const.API}/admin/applications/${id}`;
      $.ajax({
        url: url,
        dataType: 'json',
        cache: false,
        headers: {
            'FIDELISA_PROVIDER': Const.PROVIDER,
            'FIDELISA_PROVIDER_KEY': Const.PROVIDER_KEY,
            'FIDELISA_APIUSER': Const.USER
        },
        success: (application) => {
          application.url_privacy = "https://api.fidelisa.com/privacy_policy?app_id="+application.account_id;
          if (application.iconId)
            application.iconUrl = Const.API+'/api/images/'+application.iconId
          else
            application.iconUrl = 'images/icon.png'

          resolve(application);
        },
        error: function(xhr, status, err) {
          reject(err);
        }
      });

    });
  }

  static updateApplication(data) {
    return new Promise((resolve, reject) => {

      var url = Const.API+'/admin/applications'+uuid;
      $.ajax({
        url: url,
        method: 'PATCH',
        data : data,
        dataType: 'json',
        cache: false,
        headers: {
            'FIDELISA_PROVIDER': Const.PROVIDER,
            'FIDELISA_PROVIDER_KEY': Const.PROVIDER_KEY,
            'FIDELISA_APIUSER': Const.USER
        },
        success: function(data) {
          resolve(data);
        },
        error: function(xhr, status, err) {
          reject(err);
        }
      });
    });
  }
}

module.exports = FidelisaApi;
