const express = require('express')
const app =express()
const ejs =require('ejs')
require('dotenv').config();
const expressSession =require('express-session')
const flash = require('connect-flash')
const connectDB = require('./middleware/db')
const morgan = require('morgan')
const cors = require('cors')


global.loggedIn =null

//controller
const indexController =require('./controllers/indexController')
const loginController =require('./controllers/loginController')
const registerController =require('./controllers/registerController')
const storeController =require('./controllers/storeUserController')
const loginUserController =require('./controllers/loginUserController')
const logoutController =require('./controllers/logoutController')
const homeController =require('./controllers/homeController')

//Middleware
const redirectIfAuth = require('./middleware/redirectifAuth')
const authMiddleware = require('./middleware/authMiddleware')

connectDB();
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret:"node secret"
}))
app.use("*",(req,res,next)=>{
    loggedIn =req.session.userId
    next()
})
app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(cors())

app.get('/', indexController)
app.get('/home',authMiddleware, homeController)
app.get('/login',redirectIfAuth, loginController)
app.get('/register',redirectIfAuth, registerController)
app.post('/user/register',redirectIfAuth, storeController)
app.post('/user/login',redirectIfAuth, loginUserController)
app.get('/logout', logoutController)

app.listen(4000,()=>{
    console.log(`Server running on port 4000`)
})