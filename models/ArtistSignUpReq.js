const { Schema, model } = require("mongoose");

const artistSignUpReqSchema = new Schema({
    instagram : String,
    city : String
})







const ArtistSignUpReq = model("artistSignUpReqSchema", artistSignUpReqSchema);
module.exports = ArtistSignUpReq;