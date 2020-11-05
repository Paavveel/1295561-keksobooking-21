'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  const sendData = function (data, onSuccess, onError) {
    window.util.processingRequests(URL, onSuccess, onError, `POST`, data);
  };

  window.upload = {
    sendData
  };
})();
