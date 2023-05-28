const User = require("../models/user");
const Maincateg = require("../models/maincateg");
const Subcateg = require("../models/subcateg");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const subcateg = require("../models/subcateg");
exports.logIn = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email !== "admin@admin.com") {
        return res.status(400).json({
            msg: "wrong password or email"
        })
    }
    User.findOne({ email: email })
        .then(u => {
            if (u) {
                if (bcrypt.compareSync(password, u.password)) {
                    const user = {
                        id: u._id,
                        name: u.name,
                        rolle: "admin"
                    }
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                        data: user,
                    }, process.env.ACCESS_TOKEN);
                    res.status(200).json({
                        msg: "ok",
                        token: token
                    })
                } else {
                    res.status(400).json({
                        msg: "wrong password or email"
                    })
                }
            } else {
                res.status(400).json({
                    msg: "wrong password or email"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: "server error",
                error: err.message
            })
        })
}
exports.addMainCateg = (req, res) => {
    const name = req.body.name;
    const img = req.file.path;
    if (!name) {
        return res.status(400).json({
            msg: "name is required"
        })
    }
    Maincateg.findOne({ name: name })
        .then(m => {
            if (m) {
                res.status(400).json({
                    msg: "this name is already used"
                })
            } else {
                const newCateg = new Maincateg({
                    name: name,
                    img: img,
                    books: [],
                    subcateg: []
                })
                newCateg.save()
                    .then(c => {
                        res.status(200).json({
                            msg: "ok",
                            data: c
                        })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: "server error",
                error: err.message
            })
        })
}
exports.addSubCateg = (req, res) => {
    const name = req.body.name;
    if (!name) {
        return res.status(400).json({
            msg: "name is required"
        })
    }
    Subcateg.findOne({ name: name })
        .then(sub => {
            if (sub) {
                return res.status(400).json({
                    msg: "this name is already used"
                })
            } else {
                const newSub = new Subcateg({
                    name: name,
                    books: []
                })
                newSub.save()
                    .then(s => {
                        res.status(200).json({
                            msg: "ok",
                            data: s
                        })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: "server error",
                error: err.message
            })
        })
}