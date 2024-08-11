const express = require('express');
const app = express();
const port = process.env.PORT || 1500;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.post('/data', (req,res) => {
  console.log(req.body.hello);
  res.json({recieved: 'yes'})
})

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});




