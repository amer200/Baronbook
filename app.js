require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbUrl = process.env.DB_URL;
const port = process.env.PORT;
// const multer = require('multer');
// const jwt = require("jsonwebtoken");
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
// var cors = require('cors');
// app.use(cors())
/********************************************************************************* */
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads/')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + file.originalname;
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// });

/********************************************************************************* */
// const upload = multer({ storage: storage });
// app.post('/admin/add-new-category', upload.single('img'));
// app.post("/products/add-img/:id", upload.array('imgs'));
// app.post("/products/edit-prod/:pid", upload.array('imgs'));
// app.post("/products/edit-categ/:id", upload.single('img'));
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

// const productRoutes = require('./routes/product');
// const supplierRoutes = require('./routes/supplier');
// const adminRoutes = require('./routes/admin');
// const userRoutes = require('./routes/user');
// const billRoutes = require('./routes/bill');
// app.use('/products', productRoutes);
// app.use('/supplier', supplierRoutes);
// app.use('/admin', adminRoutes);
// app.use('/user', userRoutes);
// app.use('/bill', billRoutes);
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