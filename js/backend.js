'use strict';

const GET_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const POST_URL = `https://21.javascript.pages.academy/keksobooking`;

const getData = (onSuccess, onError) => {
  window.util.processingRequests(GET_URL, onSuccess, onError, `GET`);
};

const sendData = (data, onSuccess, onError) => {
  window.util.processingRequests(POST_URL, onSuccess, onError, `POST`, data);
};

window.backend = {
  getData,
  sendData
};

