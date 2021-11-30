import React from 'react'
import {useState, useEffect} from 'react'

import { getArtistInfo } from '../services/spotifyCalls';
import { getArtistAlbums } from '../services/spotifyCalls';
import { checkIfFollowingArtist } from '../services/spotifyCalls'
import { followArtistsOnSpotify } from '../services/spotifyCalls'

function ArtistProfileHeader({token, catchSpotifyID, artistSpotifyId}) {

    const [isFollowing, setIsFollowing] = useState(Boolean)
    const [tracksOnSpotify, setTracksOnSpotify] = useState(Number)
    const [singlesOnSpotify, setSinglesOnSpotify] = useState(Number)
    const [albumsOnSpotify, setAlbumsSpotify] = useState(Number)
    const [artistFollowers, setArtistFollowers] = useState(Number)

    const [albums, setAlbums] = useState([])
    const [artistInfo, setArtistInfo] = useState([])

    const handleFollow = () => {
        followArtistsOnSpotify(token, artistInfo.id)
        setIsFollowing(true)
    }

    const countTracks = (albums) => {
        let trackCount = 0
        let singlesCount = 0
        let albumCount = 0

        for (let album of albums){
            if (album.album_type === "single"){
                trackCount++
                singlesCount++
            } else if (album.album_type === "album"){
                trackCount += album.total_tracks
                albumCount++
            }
        }

        setTracksOnSpotify(trackCount)
        setSinglesOnSpotify(singlesCount)
        setAlbumsSpotify(albumCount)

        //return [trackCount, singlesCount, albumCount]
    }


    useEffect(() => {
       catchSpotifyID()
            .then(artistSpotifyId => {
                getArtistInfo(token, artistSpotifyId)
                    .then(info => {
                        setArtistInfo(info)
                        setArtistFollowers(info.followers.total)
                        console.log("info", info)
                    })
        
                getArtistAlbums(token, artistSpotifyId)
                    .then(albums => {
                        console.log(albums)
                        countTracks(albums)
                    })

                checkIfFollowingArtist(token, artistSpotifyId)
                    .then(data => {
                        if (data[0] === true){
                            setIsFollowing(true)
                        } else if (data[0] === false) {
                            setIsFollowing(false)
                        }
            })
        })
    }, [])

    // return (
    //     <div>
    //         test
    //     </div>
    // )

    if (token === null){
        return (
            <div>
                <h1>{artistInfo.name}</h1>
                <h4>followers : {artistFollowers}</h4>
                <h3>tracks on spotify {tracksOnSpotify}, singles {singlesOnSpotify}, albums {albumsOnSpotify}</h3>
            </div>
        )
    }

    if (token !== null && isFollowing === false){
        return (
            <div>
                <h1>{artistInfo.name}</h1>
                <h4>followers : {artistFollowers}</h4>
                <h3>tracks on spotify {tracksOnSpotify}, singles {singlesOnSpotify}, albums {albumsOnSpotify}</h3>
                <button onClick={handleFollow}>follow trapper</button>
            </div>
        )
    }

    if (token !== null && isFollowing === true){
        return (
            <div>
                <h1>{artistInfo.name}</h1>
                <h4>followers : {artistInfo.followers.total}</h4>
                <h3>tracks on spotify {tracksOnSpotify}, singles {singlesOnSpotify}, albums {albumsOnSpotify}</h3>
                <button disabled>already following</button>
            </div>
        )
    }
}

export default ArtistProfileHeader
