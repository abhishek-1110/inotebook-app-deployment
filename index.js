const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');
const router = require('./routes/auth');

connectToMongo();

const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json()) // this middleware is used if you want to send request through body req.body

// available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.use('/', router);

if (process.env.NODE_ENV === 'production') {
  
  const path = require('path')

  app.use(express.static(path.join(__dirname, 'client', 'build')))

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  });
}

app.listen(port, () => {
  console.log(`iNotebook backend app listening on port ${port}`)
})