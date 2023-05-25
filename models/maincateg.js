const mongoose = require("mongoose");

const maincategSchema = mongoose.Schema({
    name: String,
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    subcateg: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcateg' }]
})

module.exports = mongoose.model("Maincateg", maincategSchema);