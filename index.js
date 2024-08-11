const express = require('express');
const app = express();
const port = process.env.PORT || 1500;


app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
