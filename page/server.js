const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT || 8080;
const app = express();
app.use(cors())
app.use(express.static('app'))
app.use(express.static('public'))

app.get('/', (req, res, next) => {
  const indexPage = fs.readFileSync('./index.html');
  return res.status(200).send(indexPage.toString());
});

app.get('/search', function(req, res) {
  fs.readFile('public/html/search.html', function(error, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
  });
});

/* read mysql */
const mysql = require('mysql');
const dbConfig = fs.readFileSync('./private.json')
const conn = JSON.parse(dbConfig)
var connection = mysql.createConnection({
  host: conn.host,
  port: conn.port,
  user: conn.user,
  password: conn.password,
  database: conn.database
})

var connection = mysql.createConnection(conn);
connection.connect(function(err) {
  if (err) {
    throw err;
  } else {
    console.log("db connect success")
  }
});

app.get('/content', function(request, response) {
  connection.query('SELECT * FROM content', function (error, data) {
    response.send(data);
  })
})

app.use((req, res, next) => {
  return res.status(404).send('Not found');
});
app.use((req, res, next) => {
  return res.status(500).send('Internal server error');
});

app.listen(port, () => console.log(`Server is running at ${port}`));