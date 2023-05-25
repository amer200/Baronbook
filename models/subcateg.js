const mongoose = require("mongoose");

const subcategSchema = mongoose.Schema({
    name: String,
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    maincateg: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Maincateg' }]
})

module.exports = mongoose.model("Subcateg", subcategSchema);