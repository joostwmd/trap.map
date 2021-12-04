const Artist = require("../models/Artist");
const spotifyApiConfig = require('./spotifyApiConfig')

const router = require("express").Router();



// You put the next routes here 👇
// example: router.use("/auth", authRoutes)



router.use("/callback/", (req, res, next) => {
  console.log("test")
  const code = spotifyApiConfig.getCodeFromRedirect()
  spotifyApiConfig.fetchPrivateToken(code)
})


//get all artists
router.get("/map", (req, res, next) => {
  Artist.find({})
       .then(artists => {
         res.status(200).json(artists)
       })

       .catch(err => next(err))
})



//get specific artist
router.get("/map/:id", (req, res, next) => {
  //for ttesting here
  spotifyApiConfig.fetchPublicToken()
    .then(public_token => {
      console.log("public_token", public_token)
    })

  Artist.findById(req.params.id)
    .then(artist => {
      res.status(200).json(artist)
    }).catch(err => next(err))  
})


module.exports = router;
