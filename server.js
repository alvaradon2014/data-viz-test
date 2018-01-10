const express = require('express');
const hbs = require('hbs'); //
const fs = require('fs');

const port = process.env.PORT || 3000; // for Heroku deployment
var app = express();

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//   //res.send('<h1>Hello Express!</h1>');
//   res.render('index.html');
// });

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
