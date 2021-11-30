import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from "axios"
import { getTokenFromResponse } from './services/spotifyAuth';
import SpotifyWebApi from 'spotify-web-api-node';

import Home from './pages/Home';
import Map from './pages/Map';
import ArtistProfile from './pages/ArtistProfile';
import Nav from './components/Nav';
import Playlists from './pages/Playlists';


function App(props) {

  const token = props.token
  const spotifyApi = props.spotifyApi

  useEffect(() => {
    console.log(token, spotifyApi)
  })

  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
        <Routes>       
          <Route 
            path="/" 
            element={<Home  token={token} spotifyApi={spotifyApi} />}           
          />

          <Route 
            path="/profile" 
            element={ <ArtistProfile token={token} spotifyApi={spotifyApi} />}        
          />

          <Route 
            exact path="/addToPlaylist/:track"
            element={<Playlists token={token} spotifyApi={spotifyApi} />}
          />

          <Route 
            exact path="/map"
            element={<Map token={token} spotifyApi={spotifyApi} />}
          />

          <Route 
            exact path="/map/:artist"
            element={<ArtistProfile token={token} spotifyApi={spotifyApi} />}
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
