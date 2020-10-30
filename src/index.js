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

          localStorage.setItem("email", response.data.user_details.email);
          localStorage.setItem("userName", response.data.user_details.userName);
          localStorage.setItem("address", response.data.user_details.address);
          localStorage.setItem("age", response.data.user_details.age);
          localStorage.setItem("gender", response.data.user_details.gender);

          return Axios(response.config)
        }).catch(error => {
          console.log("error", error);
        })
    }
  } 
  // else {
    return response;
  // }
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
