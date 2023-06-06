const Book = require("../models/books");
const User = require("../models/user");
const Maincateg = require("../models/maincateg");
const Subcateg = require("../models/subcateg");
const subcateg = require("../models/subcateg");

/***categs */
exports.getAllMainCategs = (req, res) => {
    Maincateg.find()
        .then(m => {
            res.status(200).json({
                data: m
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: "server error",
                error: err.message
            })
        })
}
exports.getAllSubCategs = (req, res) => {
    Subcateg.find()
        .then(s => {
            res.status(200).json({
                data: s
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: "server error",
                error: err.message
            })
        })
}
exports.getSubsByMain = async (req, res) => {
    try {
        const mainId = req.params.mainId;
        const allSubs = await Subcateg.find();
        let mySubs = [];
        allSubs.forEach(s => {
            if (s.mainCateg) {
                s.mainCateg.forEach(m => {
                    if (m == mainId) {
                        mySubs.push(s)
                    }
                })
            }
        })
        res.status(200).json({
            data: mySubs
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}
exports.getAllBooks = (req, res) => {
    Book.find()
        .populate("subcateg user")
        .then(books => {
            res.status(200).json({
                data: books
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}
exports.getBooksBySub = (req, res) => {
    const subId = req.params.subId;
    Book.find({ subcateg: subId })
        .then(b => {
            res.status(200).json({
                data: b
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}
exports.getBookById = (req, res) => {
    const bId = req.params.bId;
    Book.findById(bId)
        .then(b => {
            res.status(200).json({
                data: b
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}
exports.getBooksByMain = (req, res) => {
    const mainId = req.params.mainId;
    let mySubs = [];
    Subcateg.find()
        .then(subs => {
            subs.forEach(s => {
                if (s.mainCateg.includes(mainId)) {
                    mySubs.push(s._id)
                }
            })
            return mySubs
        })
        .then(mySubs => {
            Book.find()
                .then(books => {
                    let myBooks = [];
                    books.forEach(b => {
                        mySubs.forEach(s => {
                            if (b.subcateg.toString() == s.toString()) {
                                myBooks.push(b)
                            }
                        })
                    })
                    res.status(200).json({
                        data: myBooks
                    })
                })
        })
        .catch(err => {
            console.log(err)
        })
}