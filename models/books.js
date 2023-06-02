const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: String,
    description: String,
    isauthor: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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