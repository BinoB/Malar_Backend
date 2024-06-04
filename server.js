const express = require('express');
const mongoose = require('mongoose');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config()

// dotenv.config({path:path.join(__dirname,"config/config.env")});


app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )

const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')

app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/api/v1/',order);
app.use('/api/v1/',payment);

/* if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
} */
app.get("/", (req, res) => {
    res.send("Home Page");
  });

app.use(errorMiddleware)

const PORT = process.env.PORT || 5000
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    })
}).catch((error)=>console.log(error))

module.exports = app;