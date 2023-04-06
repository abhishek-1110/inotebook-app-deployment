const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = process.env.PORT || 5000

app.use(express.json()) // this middleware is used if you want to send request through body req.body
app.use(cors());

// available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


if (process.env.NODE_ENV === 'production') {
  

  app.use('/login', require("./routes/auth"));

  const path = require('path')

  app.get('/', (req, res) => {
    app.use(express.static(path.join(__dirname, 'client', 'build')))
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  });
}

app.listen(port, () => {
  console.log(`iNotebook backend app listening on port ${port}`)
})