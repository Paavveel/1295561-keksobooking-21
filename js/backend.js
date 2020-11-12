'use strict';

const POST_URL = `https://21.javascript.pages.academy/keksobooking`;

function getData(url, onSuccess, onError) {
  window.util.processingRequests(url, onSuccess, onError, `GET`);
}

function sendData(data, onSuccess, onError) {
  window.util.processingRequests(POST_URL, onSuccess, onError, `POST`, data);
}

window.backend = {
  getData,
  sendData
};

