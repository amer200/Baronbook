const mongoose = require("mongoose");

const DayBookSchema = mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
})
module.exports = mongoose.model("Daybook", DayBookSchema);