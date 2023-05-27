const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    gender: String,
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    birthdate: {
        day: String,
        month: String,
        year: String
    }
})
module.exports = mongoose.model("User", userSchema);