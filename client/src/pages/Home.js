import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { spotifyAuthUrl } from '../services/spotifyAuth'

function Home(props) {

    const API_URL = 'http://localhost:5005';

    
    useEffect(() => {
        console.log(spotifyAuthUrl)
      }, [])

    

    
    
    
    return (
        <div>
            <h1>trap map</h1>
            <a href={spotifyAuthUrl}>login</a>
        </div>
    )
}

export default Home
