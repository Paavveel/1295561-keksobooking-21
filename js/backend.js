'use strict';

(function () {
  const getData = function (url, onSuccess, onError) {
    window.util.processingRequests(url, onSuccess, onError, `GET`);
  };

  const URL = `https://21.javascript.pages.academy/keksobooking`;

  const sendData = function (data, onSuccess, onError) {
    window.util.processingRequests(URL, onSuccess, onError, `POST`, data);
  };

  window.backend = {
    getData,
    sendData
  };
})();
