const express = require('express')
const cors = require('cors')
const request = require('request')
const bodyParser = require('body-parser')
const http = require('http')
const fs = require('fs')
const path = require('path')
const fetch = require("node-fetch")

const port = process.env.PORT || 8080;
const app = express();

app.use(cors())
app.use(express.static('app'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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
const { response } = require('express')
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
    console.log("Database connect success")
  }
});

app.get('/content', function(request, response) {
  connection.query('SELECT * FROM content', function (error, data) {
    response.send(data);
  })
})

app.post('/keyword', function(req, res) {
  var kw = req.body.keyword
  
  var qry = `SELECT * FROM keyword as k, content as c WHERE k.key_word = "${kw}" AND k.key_id = c.key_id`

  connection.query(qry, function (error, data) {
    res.json(data);
  })
})

// app.post('/postKeyword', function(req, res) {
//     var access_token;
//     // get token
//     let url = new URL("https://account.uipath.com/oauth/token");
//     var requestOption = {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//             "X-UIPATH-TenantName" : "DefaultTenant"
//         },
//         body: JSON.stringify({
//           "grant_type": "refresh_token",
//           "client_id" : "123",
//           "refresh_token" : "123"
//         })
//     }
//     fetch(url.toString(), requestOption).then((res) => {
//         return res.json()
//     }).then((data) => {
//         url = new URL("https://cloud.uipath.com/knuodbfjqm/DefaultTenant/odata/Queues/UiPathODataSvc.AddQueueItem");
//         requestOption = {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json; charset=utf-8",
//                 "X-UIPATH-OrganizationUnitId" : "1292787",
//                 "Authorization" : data.access_token
//             },
//             body: JSON.stringify({
//                 "itemData": {
//                     "Priority": "Normal",
//                     "Name": "keywordQ",
//                     "SpecificContent": {
//                         "Type": "subject",
//                         "Keyword": req.body.keyword,
//                     }
//             }
//             })
//         }
//         fetch(url.toString(), requestOption).then((res) => {
//             return res.json()
//         }).then((data) => {
//             console.log(data)
//         })
//       })
// })

app.use((req, res, next) => {
  return res.status(404).send('Not found');
});
app.use((req, res, next) => {
  return res.status(500).send('Internal server error');
});

app.listen(port, () => console.log(`Server is running at ${port}`));