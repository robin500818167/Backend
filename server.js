const express = require('express')
const { engine } = require('express-handlebars')
const User = require("./models/User")
const app = express();
const bodyparser = require('body-parser')
const port = process.env.PORT || 1337
const connection = require("./database/connection")
const path = require('path')
require('dotenv').config()

// Database connection
connection()

// Statische data
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(bodyparser.urlencoded({
  extended: true
}))
// Handlebars
app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'index'
}));

app.set('view engine', '.hbs')
app.set("views", "./views")

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/registreren', (req, res) => {
  res.render('registreren');
});

app.get('/account', (req, res) => {
User.find({
  username: req.body.username
}).then((documents) => {
  let username = documents.map(User => User.username);
  let email = documents.map(User => User.email);
    res.render('account', {
      username: username,
      email: email
    });
      })
  })

app.post('/registreren', async (req, res) => {
  const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
  });
});

app.post('/uitloggen', (req, res) => {
  res.redirect('/');
});

app.post('/update', (req, res) => {
  User.updateOne({
      username: req.body.username
  }, {
      username: req.body.username,
      email: req.body.email
  }).exec();
  req.body.username = req.body.username;
  res.redirect('/account');
})
app.get('*', (req, res) => {
  res.render('404');
});

app.listen(port);