const mongoose = require("mongoose");

const subcategSchema = mongoose.Schema({
    name: String,
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
})

module.exports = mongoose.model("Subcateg", subcategSchema);