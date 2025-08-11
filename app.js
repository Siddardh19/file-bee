const indexRouter=require('./routes/index.routes');
const userRouter=require('./routes/user.routes')
const dotenv=require('dotenv')
dotenv.config();
const express = require('express');
const connectToDB=require('./config/db')
const cookieParser=require('cookie-parser')


connectToDB();


const app=express()

app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', indexRouter)
app.use('/user', userRouter )


app.listen(3000, ()=> {
    console.log('Server is running on port 3000')
})