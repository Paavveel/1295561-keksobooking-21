'use strict';

(function () {
  const getData = function (url, onSuccess, onError) {
    window.util.processingRequests(url, onSuccess, onError, `GET`);
  };


  window.load = {
    getData
  };
})();
