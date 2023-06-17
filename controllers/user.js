const User = require("../models/user");
const Book = require("../models/books");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const salt = 10;
exports.signUp = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const gender = req.body.gender;
        const birthdate = {
            day: req.body.day,
            month: req.body.month,
            year: req.body.year
        }
        const isEmailFound = await User.findOne({ email: email });
        if (isEmailFound) {
            return res.status(400).json({
                msg: "this is email is already registery try to login"
            })
        }
        const hash = bcrypt.hashSync(password, salt);
        const u = new User({
            name: name,
            password: hash,
            email: email,
            gender: gender,
            books: [],
            birthdate: birthdate
        })
        u.save()
            .then(u => {
                res.status(200).json({
                    msg: "ok"
                })
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: err
        })
    }
}
exports.logIn = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(u => {
            if (u) {
                if (bcrypt.compareSync(password, u.password)) {
                    const user = {
                        id: u._id,
                        name: u.name,
                        rolle: "user"
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
exports.getUserData = (req, res) => {
    const id = req.user.id;
    User.findById(id)
        .then(u => {
            res.status(200).json({
                data: u
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
exports.editUserData = async (req, res) => {
    try {
        const userId = req.user.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const gender = req.body.gender;
        const birthdate = {
            day: req.body.day,
            month: req.body.month,
            year: req.body.year
        }
        const myUser = await User.findById(userId);
        const userByMail = await User.findOne({ email: email });
        if (userByMail) {
            if (userByMail._id !== myUser._id) {
                return res.status(400).json({
                    error: "this email is already exist"
                })
            }
        }
        myUser.name = name;
        myUser.email = email;
        myUser.password = password;
        myUser.gender = gender;
        myUser.birthdate = birthdate;
        myUser.save()
            .then(u => {
                res.status(200).json({
                    msg: "ok"
                })
            })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "server error",
            error: err.message
        })
    }
}
exports.addNewBook = (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const isauthor = req.body.isauthor;
    const userId = req.user.id;
    const subcategId = req.body.subcategId;
    const lang = req.body.lang;
    const authorname = req.body.authorname
    const img = req.files.img[0].path;
    const book = req.files.book[0].path;
    const pageno = req.body.pageno;
    const publishinghouse = req.body.publishinghouse;
    const releasedate = req.body.releasedate;
    const isbn = req.body.isbn;
    const newBook = new Book({
        title: title,
        description: description,
        isauthor: isauthor,
        user: userId,
        subcateg: subcategId,
        lang: lang,
        authorname: authorname,
        img: img,
        book: book,
        pageno: pageno,
        publishinghouse: publishinghouse,
        releasedate: new Date(releasedate),
        isbn: isbn
    })
    newBook.save()
        .then(b => {
            console.log(b)
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
exports.getBooksByUser = (req, res) => {
    const uId = req.user.id;
    Book.find({ user: uId })
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