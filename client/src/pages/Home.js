import React from 'react'
import { useState, useEffect } from 'react'
import {loginUrl} from '../services/spotifyAuth'

function Home(props) {

    props.spotifyApi.setAccessToken(props.token)

        useEffect(() => {
        console.log(props)
        // spotifyApi.setAccessToken(token)
        // spotifyApi.getMe()
        //     .then(function(data) {
        //         if(data.body.product === "premium"){
        //             setHasPremium(true)
        //         }
        //     })
      }, [])

    const [id, setId] = useState("")
   
    const test = () => {
        console.log(props)
        // props.spotifyApi.searchArtists("Paolo Conte")
        //     .then(function(data) {
        //         console.log(data.body.artists.items[0].id)
        //         setId(data.body.artists.items[0].id)
        //     })
    }

    const follow = () => {
        props.spotifyApi.followArtists([id ,])
    }

    const getMe = () => {
        props.spotifyApi.getMe()
            .then(function(data) {
                console.log(data.body)
            })
    }

    const getArtist = () => {
        props.spotifyApi.getArtist(id)
            .then(function(data) {
                console.log(data.body)
            })
    }
    return (
        <div>
            <h1>trap map</h1>
            <a href={loginUrl}>login with spotify</a>
            <button onClick={test}>test</button>
            <button onClick={follow}>follow</button>
            <button onClick={getMe}>get me</button>
            <button onClick={getArtist}>get artist</button>
        </div>
    )
}

export default Home
