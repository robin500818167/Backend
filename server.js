
const express = require("express")
const app = express()
const PORT = process.env.PORT || 1337
const Handlebars = require("handlebars")

app.use('/static',express.static('static'))
app.set('view engine', 'hbs')
app.set('views', 'views')


app.get('/', (req, res) => { 
  res.render('main', {
      profile: 
      {
          username: "Nico di Angelo",
          email: "nicodiangelo@gmail.com",
          follow: "114 followers   98 following"
      }
  })
  })

app.get("/about", (req, res) => {
  res.end("About me");
});

app.get('*', (req, res) => {
    res.send('Not found..')
})

app.listen(PORT)  