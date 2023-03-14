const express = require('express')
const { engine } = require('express-handlebars')
const User = require("./models/User")
const app = express()
const bodyparser = require('body-parser')
const port = process.env.PORT || 1337
const connection = require("./database/connection")
const path = require('path')
const session = require('express-session')
require('dotenv').config()

// Database connection
connection()

// Statische data
app.use('/static', express.static(path.join(__dirname, 'static')))

// Bodyparser
app.use(bodyparser.urlencoded({
  extended: true
}))
// Handlebars
app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'index'
}))

//Views
app.set('view engine', '.hbs')
app.set("views", "./views")

//Session
app.set("trust proxy", 1)
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
)
//Routes
app.get('/', (req, res) => {
  res.render('main')
})

app.get('/registreren', (req, res) => {
  res.render('registreren')
})

app.get('/account', async(req,res) => {
  const {username, email} = req.session.user
  res.render('account', {
      username: username,
    email: email
  })
  })

app.post('/registreren', async (req, res) => {
  const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
  })
  await newUser.save() 
  res.location('/account')
  res.redirect('/account')
})
app.post('/uitloggen', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

app.post("/inloggen", async (req, res) => {
  const currentUser = await User.findOne({
    username: req.body.username,
  })
  req.session.user = {
    username: currentUser.username,
    password: currentUser.password,
    email: currentUser.email,
  }
  res.redirect("/account")
})
app.post("/update", async (req, res) => {
  await User.findOneAndUpdate(
    {
      username: req.session.user.username,
    },
    {
      username: req.body.username,
      email: req.body.email,
    }
  );
  req.session.user.username = req.body.username;
  req.session.user.email = req.body.email;
  res.redirect("/account");
});
app.get('*', (req, res) => {
  res.render('404')
})

app.listen(port)