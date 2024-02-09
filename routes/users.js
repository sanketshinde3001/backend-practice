const mongoose = require( "mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/endgame2");
// it will create the db name - practicekaro

const userschema = mongoose.Schema({
  username: String,
  email:String,
  password: String,
});


userschema.plugin(plm);
// each document have above three things

module.exports = mongoose.model("user",userschema);