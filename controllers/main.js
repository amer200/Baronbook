const Book = require("../models/books");
const User = require("../models/user");
const Maincateg = require("../models/maincateg");
const Subcateg = require("../models/subcateg");

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
        .populate("books")
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