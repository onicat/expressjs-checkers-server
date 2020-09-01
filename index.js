/*eslint-disable default-case*/

const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const port = 3005;
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.ws('/', function(ws, req) {
});

app.listen(port, (err) => {
  if (err) {
    console.log('Unhandled error');
  } else {
    console.log(`Server started on port ${port}`);
  }
});