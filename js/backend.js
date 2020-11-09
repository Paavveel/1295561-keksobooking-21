'use strict';

const getData = function (url, onSuccess, onError) {
  window.util.processingRequests(url, onSuccess, onError, `GET`);
};

const POST_URL = `https://21.javascript.pages.academy/keksobooking`;

const sendData = function (data, onSuccess, onError) {
  window.util.processingRequests(POST_URL, onSuccess, onError, `POST`, data);
};

window.backend = {
  getData,
  sendData
};

