import React from 'react'
import {useState, useEffect} from 'react'

function Track({track, spotifyApi}) {

    return (
        <div>
            <h4>{track.name}</h4>
            <audio controls>
                <source src={track.preview_url} />          
            </audio>

        </div>
    )
}

export default Track
