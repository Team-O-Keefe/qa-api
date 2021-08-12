var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan('dev'));
app.set('port', 3000);


app.get('/', (req, res) => {
  res.send('Hello from the server!');
})

app.get('/questions', (req, res) => {
  res.send('questions endpoint is being hit');
})

app.listen(app.get('port'));
console.log('listening on', app.get('port'));