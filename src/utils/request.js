import axios from "axios";

const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/91ed5635adc2559d3e7a6e6513b7a978/api',
  timeout: 10000
});

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      resolve(response.data);
    }, err => {
      reject(err);
    })
  });
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data);
    }, err => {
      reject(err);
    })
  });
}
