import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import ReactMapGl, {Marker} from "react-map-gl"
import { Link } from 'react-router-dom'

import ArtistProfile from './ArtistProfile'
//import MapMarker from '../components/MapMarker'

function Map(props, {StaticMap}) {

    const berlinViewport = {
        latitude : 52.520008, 
        longitude : 13.404954,
        width : "100w",
        height : "100vh",
        zoom : 9,
        //minZoom: 9,
        maxBoundSouthWest : [52.42538541264653, 13.235882868516638],
        maxBoundNorthEast : [52.597974617950264, 13.582638824470338]     
    }

    const [viewport, setViewport] = useState(berlinViewport)
    const [mapMovementAllowed, setMapMovementAllowed] = useState(true)
    const [allArtists, setAllArtists] = useState([])
    
    const API_URL = 'http://localhost:5005';

    
    const getAllArtists = () => {
        axios.get(`${API_URL}/api/map`)
             .then(res => {
                 setAllArtists(res.data)
             })
             .catch(err => console.log(err))
    }
    useEffect(() => {
        console.log(ReactMapGl)
        getAllArtists()
    }, [])

    return (
        <div>
            <ReactMapGl
                {...viewport}
                {...ReactMapGl}
                mapboxApiAccessToken = "pk.eyJ1Ijoiam9vc3R3bWQiLCJhIjoiY2t1NDQ3NmJqMXRwbzJwcGM5a3FuY3B3dCJ9.yyon_mO5Y9sI1WgD-XFDRQ"
                mapStyle = "mapbox://styles/joostwmd/ckvwifepf21kj15pflu8gbkdd"
                // mapOptions={{
                //     maxBounds={[
                //         {lon : 52.42538541264653,  lat : 13.235882868516638},
                //        {lon : 52.597974617950264, lat : 13.582638824470338},
                //     ]: null}
                // }}
                onViewportChange={viewport => {
                        // if (viewport.longitude . . .) restrict map movement
                        // if (viewport.longitude . . .) allow map movement 


                        if(mapMovementAllowed === true){
                            setViewport(viewport)
                        }
                    }}
            >
                {allArtists.map(artist => {
                    return (
                        <Marker
                            latitude={artist.coordinates[1]}
                            longitude={artist.coordinates[0]}
                        >
                            <Link to={`${artist._id}`}>
                                <div>{artist.name}</div>
                            </Link>
                        </Marker>
                    )
                })}
            </ReactMapGl>
            
        </div>
    )
}

export default Map
