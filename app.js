require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbUrl = process.env.DB_URL;
const port = process.env.PORT;
const cors = require('cors');
const morgan = require('morgan')
const multer = require('multer');
// const jwt = require("jsonwebtoken");
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
/******************************** */
app.use(morgan('dev'))
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
/********************************************************************************* */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + file.originalname;
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

/********************************************************************************* */
const upload = multer({ storage: storage });
app.post('/admin/add-main-categ', upload.single('img'));
app.post('/user/add-new-book', upload.fields([{
    name: 'img', maxCount: 1
}, {
    name: 'book', maxCount: 1
}]))
/********************************************************************************** */
// const store = new MongoDBStore({
//     uri: dbUrl,
//     collection: 'mySessions'
// });
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: store
// }))
/********************************************************************************* */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/********************************************************************************* */

const userRoutes = require("./routes/user");
const adminRouters = require("./routes/admin");
const mainRouters = require("./routes/main");
app.use("/", mainRouters);
app.use("/user", userRoutes);
app.use("/admin", adminRouters);
/********************************************************************************* */
mongoose.connect(dbUrl)
    .then(resu => {
        console.log('db connection done !');
        app.listen(port, () => {
            console.log('app conneted on port ' + port)
        })
    })
    .catch(err => {
        console.log(err)
    })