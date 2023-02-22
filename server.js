const express = require('express')
const { engine } = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 1337
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')));
app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'index'
}));
app.set('view engine', '.hbs');
app.set("views", "./views");
app.get('/', (req, res) => {
  res.render('main');
});
app.get('/registreren', (req, res) => {
  res.render('registreren');
});
// bodyparser codes 
app.post ('/inloggen', urlencodedParser, (req, res) => {
  res.send('Gebruikersnaam: ' + req.body.username + '<br>Wachtwoord: ' + req.body.password)
})

app.post ('/registreren', urlencodedParser, (req, res) => {
  res.send('Gebruikersnaam: ' + req.body.username + '<br>Email: ' + req.body.email + '<br>Wachtwoord: ' + req.body.password)
})

app.listen(port);