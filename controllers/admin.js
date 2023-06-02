const User = require("../models/user");
const Maincateg = require("../models/maincateg");
const Subcateg = require("../models/subcateg");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
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
exports.addSubCateg = async (req, res) => {
    try {
        const name = req.body.name;
        const mainIds = req.body.mainIds;
        const isSub = await Subcateg.findOne({ name: name });
        if (isSub) {
            return res.status(400).json({
                error: "this subCategory already exist"
            })
        }
        const newSub = new Subcateg({
            name: name,
            mainCategs: mainIds,
            books: []
        })
        await newSub.save();
        return res.status(200).json({
            data: newSub
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}
/**************************************************************************************************** */
// using promises
// exports.addSubCateg = (req, res) => {
//     const { name, mainCateg } = req.body;

//     if (!name) {
//         return res.status(400).json({
//             msg: "name is required"
//         })
//     }
//     if (!mainCateg) {
//         return res.status(400).json({
//             msg: "mainCateg is required"
//         })
//     }

//     Maincateg.findOne({ name: mainCateg })
//         .then(main => {
//             if (!main) {
//                 return res.status(400).json({
//                     msg: "this main category doesn't exist"
//                 })
//             } else {
//                 main.subcateg.forEach(sub => {
//                     if (sub.name == name) {
//                         return res.status(400).json({ error: "this subCategory already exist " })
//                     } else {
//                         const newSubCateg = new Subcateg({
//                             name,
//                             mainCateg,
//                             books: []
//                         })

//                         main.subcateg.push(newSubCateg._id)
//                         main.save()
//                             .then(m => {
//                                 console.log(m)
//                                 return null
//                             })

//                         newSubCateg.save()
//                             .then(s => {
//                                 return res.status(200).json({
//                                     msg: "ok",
//                                     data: s
//                                 })
//                             })
//                     }
//                 })
//             }
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({
//                 msg: "server error",
//                 error: err.message
//             })
//         })
// }

// #region using async await
// exports.addSubCateg = async (req, res) => {
//     try {
//         const { name, mainCateg } = req.body;

//         if (!name) {
//             res.status(400).send({ error: "name is required" })
//         }
//         if (!mainCateg) {
//             res.status(400).send({ error: "mainCateg is required" })
//         }

//         const mainCategory = await Maincateg.findOne({ name: mainCateg })

//         if (!mainCategory) {
//             res.status(400).send({
//                 error: "this main category doesn't exist"
//             })
//         } else {
//             mainCategory.subcateg.forEach(sub => {
//                 if (sub.name == name) {
//                     res.status(400).send({ error: "this subCategory already exist " })
//                 } else {
//                     const newSubCateg = new Subcateg({
//                         name,
//                         mainCateg,
//                         books: []
//                     })
//                 }
//             })
//         }

//         await newSubCateg.save();

//         res.status(200).send({ newSubCateg })

//     } catch (error) {
//         res.status(400).send(error)
//     }
// }
// #endregion using async await



// exports.addSubCateg = (req, res) => {
//     const name = req.body.name;
//     if (!name) {
//         return res.status(400).json({
//             msg: "name is required"
//         })
//     }
//     Subcateg.findOne({ name: name })
//         .then(sub => {
//             if (sub) {
//                 return res.status(400).json({
//                     msg: "this name is already used"
//                 })
//             } else {
//                 const newSub = new Subcateg({
//                     name: name,
//                     books: []
//                 })
//                 newSub.save()
//                     .then(s => {
//                         res.status(200).json({
//                             msg: "ok",
//                             data: s
//                         })
//                     })
//             }
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({
//                 msg: "server error",
//                 error: err.message
//             })
//         })
// }

// exports.addSubToMain = async (req, res) => {
//     const mainId = req.body.mainId;
//     const subIds = req.body.subIds;
//     Maincateg.findById(mainId)
//         .then(m => {
//             m.subcateg.push(...subIds)
//             return m.save()
//         })
//         .then(m => {
//             res.status(200).json({
//                 msg: "ok",
//                 data: m
//             })
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({
//                 msg: "server error",
//                 error: err.message
//             })
//         })
// }