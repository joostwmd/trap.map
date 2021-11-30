import { token } from 'morgan';
import SpotifyWebApi from 'spotify-web-api-node';


const spotifyApi = new SpotifyWebApi({
  ClientId: "25ecacddc59e4a3aadede77c0f93cf43", 
})
var token_ = localStorage.getItem(token)

//set token 

// export const setSpotifyAccessToken = () => {
//     spotifyApi.setAccessToken(token_)
// }

//user calls

export const getSpotifyUserInfo = (token) => {
    spotifyApi.setAccessToken(token)
    const res = spotifyApi.getMe()
        .then(function(data){
            return data.body
        }, function(err) {
            console.log('Something went wrong!', err);
        })
    return res
}

// export const getSpotifyProduct = () => {
//     spotifyApi.getMe()
//         .then(function(data){
//            if (data.body.product === "open"){
//                return "open"
//            } else if (data.body.product === "premium"){
//                return "premium"
//            }
//         }, function(err) {
//             console.log('Something went wrong!', err);
//         })
// }

export const checkIfFollowingArtist = (token , artistId) => {
    spotifyApi.setAccessToken(token)
    const res = spotifyApi.isFollowingArtists([artistId, ])
        .then(function(data){
            return data.body
        }, function(err) {
            console.log('Something went wrong!', err);
        })

    return res
}

export const followArtistsOnSpotify = (token, artistId) => {
    spotifyApi.setAccessToken(token)
    const res = spotifyApi.followArtists([artistId, ])
        .then(function(data){
            console.log("followed on spotify")
        }, function(err){
            console.log('Something went wrong', err)
        })
    return res
}

export const createSpotifyPlaylist = () => {
    spotifyApi.createPlaylist('trapmap berlin', { 'description': 'your favorite berlin trappers', 'public': true })
        .then(function(data) {
            console.log('created playlist')
        }, function(err) {
            console.log('Something went wrong', err)
        })       
}

export const getUserPlaylists = (username) => {
    const res = spotifyApi.getUserPlaylists(username)
        .then(function(data){
            return data.body.items
        }, function(err) {
            console.log('Something went wrong!', err);
        })
    return res
}

export const addToSpotifyPlaylist = (playlistId, trackId) => {
    const res = spotifyApi.addTracksToPlaylist(playlistId, trackId)
        .then(function(body) {
            console.log('Added tracks to playlist!');
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    return res
}


//artist calls

export const getArtistInfo = (token, artistId) => {
    spotifyApi.setAccessToken(token)
    const res = spotifyApi.getArtist(artistId)
        .then(function(data){
            return data.body
        }, function(err){
            console.log('Something went wrong', err)
        })
    return res
}

export const getArtistTopTracks = (token, artistId) => {
    spotifyApi.setAccessToken(token)
    const res = spotifyApi.getArtistTopTracks(artistId, "DE")
        .then(function(data){
            return data.body.tracks
        }, function(err){
            console.log('Something went wrong!', err)
        })
    return res
}

export const getArtistAlbums = (token, artistId) => {
    spotifyApi.setAccessToken(token)
    const res = spotifyApi.getArtistAlbums(artistId)
        .then(function(data){
            return data.body.items
        }, function(err){
            console.log('Something went wrong!', err)
        })
    return res
}

export const getAlbumTracks = (token, albumId) => {
    spotifyApi.setAccessToken(token)
    const res = spotifyApi.getAlbumTracks(albumId, {limit : 30, offset : 0})
        .then(function(data) {
            console.log("x", data.body)
            return data.body
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    
    return res
}



