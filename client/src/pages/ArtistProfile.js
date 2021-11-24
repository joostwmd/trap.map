import React from 'react'
import { useEffect, useState } from "react";
import { getTokenFromResponse } from '../services/spotifyAuth';

function ArtistProfile(props) {
   
    const test = () => {
        console.log(props)
    }
    return (
        <div>
            <button onClick={test}>test</button>
        </div>
    )
    // if (hasSpotify === false){
    //     return (
    //         <div>

    //         </div>
    //     )
    // }


    // if (hasSpotify === true){
    //     return (
    //         <div>

    //         </div>
    //     )
    // }

    // if (hasSpotifyPremium === true){
    //     return (
    //         <div>

    //         </div>
    //     )
    // }
}

export default ArtistProfile
