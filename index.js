const express = require('express');
const app = express();
const port = process.env.PORT || 1500;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.post('/data', (req, res) => {
  try {
    if (!req.body.hello) {
      throw new Error('Missing "hello" in request body');
    }
    console.log(req.body.hello);
    res.json({ received: 'yes' });
  } catch (error) {
    console.error('Error handling /data request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});




