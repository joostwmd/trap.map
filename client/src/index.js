import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { getTokenFromResponse } from './services/spotifyAuth';
import SpotifyWebApi from 'spotify-web-api-node';


const spotifyApi = new SpotifyWebApi({
  ClientId: "25ecacddc59e4a3aadede77c0f93cf43", 
})


var hash = getTokenFromResponse();
window.location.hash = "";

const _token = hash.access_token;

if (_token) {
  var token = _token;
  localStorage.setItem("token", token)
  spotifyApi.setAccessToken(_token)
}

ReactDOM.render(
  <React.StrictMode>
    <App token={token} spotifyApi={spotifyApi}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
