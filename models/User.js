const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", UserSchema)

collections.create({
    username: "robinvhouten",
    email: "robinnikita@hotmail.com",
    password: "Backend23"
  }).then((ans) => {
    console.log("Document inserted")
  }).catch((err) => {
    console.log(err.Message);
  })
module.exports = User