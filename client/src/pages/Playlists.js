import { load } from 'dotenv';
import React from 'react'
import { useEffect, useState } from "react";


import { getSpotifyUserInfo } from '../services/spotifyCalls'
import { getUserPlaylists } from '../services/spotifyCalls'
import { addToSpotifyPlaylist } from '../services/spotifyCalls'

function Playlists(props) {

    const token = props.token
    const spotifyApi = props.spotifyApi
    
    const [playlists, setPlaylists] = useState([])
    const [hasTrapMapPlaylist, setHasTrapMapPlaylist] = useState(Boolean)
    const [username, setUsername] = useState("")
    const [userId, setUserId] = useState("")
    
    
    const pathname = window.location.pathname.split("/")
    const trackId = pathname[2]
    


   const fetchPlaylistData = () => {
    getSpotifyUserInfo(token)
    .then(info => {
        setUsername(info.display_name)
        setUserId(info.id)
        getUserPlaylists(info.id)
            .then(userPlaylists => {
                setPlaylists(userPlaylists)
                
                for (let playlist of userPlaylists){
                    if (playlist.name === "trapmap berlin"){
                        console.log("true")
                        setHasTrapMapPlaylist(true)
                        break
                    } else {
                       setHasTrapMapPlaylist(false)
                    }
                }
                

            })
    })
   }


    

    useEffect(() => {
        console.log(hasTrapMapPlaylist)
        console.log(trackId)
        // console.log(trackId)
        // spotifyApi.setAccessToken(token)
        fetchPlaylistData(token)
        console.log(playlists)

    }, [])
 

    const handleCreateTrapMapPlaylist = () => {
        spotifyApi.createPlaylist('trapmap berlin', { 'description': 'your favorite berlin trappers', 'public': true })
            .then(function(data) {
                console.log('playlist created')

        }, function(err) {
            console.log('Something went wrong!', err);
        });

        fetchPlaylistData()
       
    }


    const handleAddTrackToSelectedPlaylist = (e) => {
        const playlistId = e.currentTarget.getAttribute("marker")
        const trackIdJSONFormat = `spotify:track:${trackId}`

        addToSpotifyPlaylist(playlistId, [trackIdJSONFormat])
            .then(function(body) {
                console.log("x", body)
            })
    }

    if(hasTrapMapPlaylist === false){
        return (
            <div>
                <h3>create a trapmap playlist for your favorite berlin trappers</h3>
                <button onClick={handleCreateTrapMapPlaylist}>create</button>
                {playlists.map(playlist => {
                    return (
                        <div onClick={handleAddTrackToSelectedPlaylist} marker={playlist.id}>
                            <h3>{playlist.name}</h3>
                        </div>
                    )
                })}
            </div>
        )
    }

    if(hasTrapMapPlaylist === true){
        return (
            <div>
                {playlists.map(playlist => {
                    if (playlist.name === "trapmap berlin"){
                        return (
                            <div onClick={handleAddTrackToSelectedPlaylist} marker={playlist.id}>
                                <h1>{playlist.name}</h1>
                            </div>
                        )
                    }
                })}

                {playlists.map(playlist => {
                    if (playlist.name !== "trapmap berlin"){
                        return (
                            <div onClick={handleAddTrackToSelectedPlaylist} marker={playlist.id}>
                                <h3>{playlist.name}</h3>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}

export default Playlists
