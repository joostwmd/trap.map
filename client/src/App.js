import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from "axios"
import { getTokenFromResponse } from './services/spotifyAuth';
import SpotifyWebApi from 'spotify-web-api-node';

import Home from './pages/Home';
import ArtistProfile from './pages/ArtistProfile';


function App(props) {

  const spotifyApi = new SpotifyWebApi({
    ClientId: "25ecacddc59e4a3aadede77c0f93cf43", 
  })

  const [token, setToken] = useState(null);
 

  useEffect(() => {
    var hash = getTokenFromResponse();
    window.location.hash = "";

    const _token = hash.access_token;
    console.log(_token)

    if (_token) {
      setToken(_token);
      spotifyApi.setAccessToken(_token)
    }
    
  }, [])

 



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            exact path="/" 
            element={<Home  token={token} spotifyApi={spotifyApi} />}           
          />

          <Route 
            exact path="/profile" 
            element={<ArtistProfile token={token} spotifyApi={spotifyApi} />}         
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
