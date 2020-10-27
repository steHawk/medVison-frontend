import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./store";
import { Provider } from "react-redux";
import Axios from 'axios';

Axios.interceptors.request.use((config) => {
  if (store.getState().auth.refreshToken && store.getState().auth.refreshToken.length > 0) {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  }
  return config;
}, (error) => {
  console.log("errr", error);
  return Promise.reject(error);
});

Axios.interceptors.response.use(response => {

  let headers = {
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + store.getState().auth.refreshToken,
    'AuthType': 'user'
  }
  if (store.getState().auth.refreshToken && store.getState().auth.refreshToken.length > 0) {
    if (response.data.statusCode === 401 && response.config && !response.config.__isRetryRequest) {

      response.config._retry = true;

      fetch("https://api.emetroplus.com/auth/access-token", { method: "POST", headers: headers })
        .then(response => {
          return response.json()
        }).then(data => {
          localStorage.setItem("token", data.accessToken)
          response.config.headers.Authorization = "Bearer " + data.accessToken;
          // window.location.reload();
          return Axios(response.config)
        }).catch(error => {
          console.log("errorrrr", error);
        })
    }
  }
  return response;
}, (error) => {
  console.log("errr", error);
  return Promise.reject(error);
})

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);


serviceWorker.register();
