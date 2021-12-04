import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie'

// import { getTokenFromResponse } from '/Users/joostwindmoller/Desktop/trap.map/trap.map/routes/spotifyApi.js';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';


// const spotifyApi = new SpotifyWebApi({
//   ClientId: "25ecacddc59e4a3aadede77c0f93cf43", 
// })




// function getHashParams() {
//   var hashParams = {};
//   var e, r = /([^&;=]+)=?([^&;]*)/g,
//       q = window.location.hash.substring(1);
//   while ( e = r.exec(q)) {
//      hashParams[e[1]] = decodeURIComponent(e[2]);
//   }
//   return hashParams;
// }

// var hash = getHashParams();
// window.location.hash = "";

// const _token = hash.access_token;

// if (_token) {
//   var token = _token;
  
//   console.log(token)
//   localStorage.setItem("personal token", token)
  
//   //spotifyApi.setAccessToken(_token)
// }

ReactDOM.render(
  <CookiesProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CookiesProvider>,
 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
