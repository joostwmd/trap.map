import React from 'react'
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'


import { getAlbumTracks } from '../services/spotifyCalls';
import { getArtistInfo } from '../services/spotifyCalls';
import { getArtistTopTracks } from '../services/spotifyCalls';
import { getArtistAlbums } from '../services/spotifyCalls';




import Track from '../components/Track'
import SpotifyPlayer from '../components/SpotifyPlayer'
import Playlists from './Playlists';
import ArtistProfileHeader from '../components/ArtistProfileHeader';

function ArtistProfile(props) {
   
    const spotifyApi = props.spotifyApi
    const token = props.token

    const [username, setUsername] = useState("")
    const [userId, setUserId] = useState("")

    const [hasPremium, setHasPremium] = useState(false)
    const [isFollowing, ] = useState(false)
    const [playlists, setPlaylists] = useState([])

    const [hasTrapMapPlaylist, setHasTrapMapPlaylist] = useState(false)
    const [openPlaylist, setOpenPlaylist] = useState(false)
    const [trackId, setTrackId] = useState("")

    const [artistSpotifyId, setArtistSpotifyId] = useState("")
    const [artistInfo, setArtistInfo] = useState({})
    const [topTracks, setTopTracks] = useState([])
    const [albums, setAlbums] = useState([])
    

    const handleAlbumClick = (e) => {
        var id = e.target.getAttribute("marker")
        
         getAlbumTracks(token, id)
            .then(data => {
                console.log(data)
            })

        
    }

    const API_URL = 'http://localhost:5005'
    const artistDbId = window.location.pathname.split("/")[2]

    const getArtist = () => {
        const res = axios.get(`${API_URL}/api/map/${artistDbId}`)
        .then(res => {
            console.log("spotifyId", res.data.spotifyId)
            setArtistSpotifyId(res.data.spotifyId)
            return res.data.spotifyId
            
    })
    return res
}

    const catchSpotifyID = async () => {
        let res = await getArtist()
        
        return res
    }

    useEffect(() => {
        catchSpotifyID()
        .then(spotifyId => {
            setArtistSpotifyId(spotifyId)
            // getArtistInfo(token, spotifyId)
            //     .then(info => {
            //         setArtistInfo(info)
            //         console.log("info", info)
            //     })

            getArtistTopTracks(token, spotifyId)
                .then(tracks => {
                    setTopTracks(tracks)
                    console.log("tracks", tracks)
                })
            
            // getArtistAlbums(token, spotifyId)
            //     .then(albums => {
            //         setAlbums(albums)
            //         console.log("albums", albums)
            //     })
        }) 
}, [])



 
    if (token === null){
        return (
            <div>
                <h1>no spotify</h1>

                <ArtistProfileHeader token={token} spotifyApi={spotifyApi} artistSpotifyId={artistSpotifyId}/>

                <h3>top tracks</h3>
                {topTracks.map(track => {
                    if (track.preview_url){
                        return (
                        <div>
                            <Track track={track} spotifyApi={spotifyApi} />
                            <Link to={`/addToPlaylist/${track.id}`}>
                                <button>add to playlist</button>
                            </Link>
                        </div>
                    )
                    } 
                })}

                {/* <h3>albums</h3>
                {albums.map(album => {
                    if (album.album_type === "album"){
                        return (
                            <div onClick={handleAlbumClick} marker={album.id}>
                                {album.name}, {album.album_type}{album.id}
                            </div>
                    )
                    }
                })} */}
            </div>
        )
    }


    if (token !== null && hasPremium === false){
        return (
            <div>
                <h1>spotify free</h1>

                <ArtistProfileHeader token={token} spotifyApi={spotifyApi} artistSpotifyId={artistSpotifyId} catchSpotifyID={catchSpotifyID}/>

                <h3>top tracks</h3>
                {topTracks.map(track => {
                    if (track.preview_url){
                        return (
                        <div>
                            <Track track={track} spotifyApi={spotifyApi} />
                            <Link to={`/addToPlaylist/${track.id}`}>
                                <button>add to playlist</button>
                            </Link>
                        </div>
                    )
                    } 
                })}

                {/* <h3>albums</h3>
                {albums.map(album => {
                    if (album.album_type === "album"){
                        return (
                            <div onClick={handleAlbumClick} marker={album.id}>
                                {album.name}, {album.album_type}{album.id}
                            </div>
                    )
                    }
                })} */}
            </div>
        )
    }

    if (token !== null && hasPremium === true){
        return (
            <div>
                <h1>spotify premium</h1>
            </div>
        )
    }
}

export default ArtistProfile


