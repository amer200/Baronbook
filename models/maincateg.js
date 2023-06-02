const mongoose = require("mongoose");

const maincategSchema = mongoose.Schema({
    name: String,
    img: String,
})

module.exports = mongoose.model("Maincateg", maincategSchema);