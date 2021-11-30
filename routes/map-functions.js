const Artist = require("../models/Artist");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)



//get all artists
router.get("/map", (req, res, next) => {
  Artist.find({})
       .then(artists => {
         console.log(artists)
         res.status(200).json(artists)
       })

       .catch(err => next(err))
})

//get specific artist
router.get("/map/:id", (req, res, next) => {
  Artist.findById(req.params.id)
          .then(artist => {
            res.status(200).json(artist)
          })
          .catch(err => next(err))
})


module.exports = router;
