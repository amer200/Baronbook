const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: String,
    description: String,
    isauthor: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    maincateg: { type: mongoose.Schema.Types.ObjectId, ref: 'Maincateg' },
    subcateg: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcateg' },
    lang: String,
    authorname: String,
    img: String,
    book: String,
    pageno: Number,
    publishinghouse: String,
    releasedate: Date,
    isbn: String
})
module.exports = mongoose.model("Book", bookSchema);