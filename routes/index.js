const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

//spotify api

const express = require('express')
const cors = require('cors')


const spotifyWebApi = require('spotify-web-api-node')

const app = express()
// const port = 8000

// app.use(cors()) // To handle cross-origin requests
// app.use(express.json()); // To parse JSON bodies

const credentials = {
  clientId: "25ecacddc59e4a3aadede77c0f93cf43",
  clientSecret: "b30b8625e1154ef49c70dc548034e97b",
  redirectUri: "http://localhost:3000/callback/"
};



router.post('/login', (req,res) => {
//  setup 
    let spotifyApi = new spotifyWebApi(credentials)

//  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api     
    const code = req.body.code
    console.log("code", code)

    // Retrieve an access token
    spotifyApi.authorizationCodeGrant(code).then((data) => {
        console.log("token", data)
        // Returning the User's AccessToken in the json formate  
        res.json({
            accessToken : data.body.access_token,
        }) 
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(400)
    })

})

module.exports = router;
