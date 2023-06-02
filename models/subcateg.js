const mongoose = require("mongoose");

const subcategSchema = mongoose.Schema({
    name: String,
    mainCateg: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Maincateg' }]
})

module.exports = mongoose.model("Subcateg", subcategSchema);