const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static('app'))
app.use(express.static('img'))
app.use(express.static('css'))
app.use('/img', express.static(path.join(__dirname,'/../img')))
app.use('/css', express.static(path.join(__dirname,'/../css')))
app.use('/js', express.static(path.join(__dirname,'/../js')))

app.get('/', (req, res, next) => {
  const indexPage = fs.readFileSync('./index.html');
  return res.status(200).send(indexPage.toString());
});

app.get('/search', function(req, res) {
  fs.readFile('html/search.html', function(error, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
  });
});

app.use((req, res, next) => {
  return res.status(404).send('Not found');
});
app.use((req, res, next) => {
  return res.status(500).send('Internal server error');
});

app.listen(port, () => console.log(`Server is running at ${port}`));
