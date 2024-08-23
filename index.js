const express = require('express');
const app = express();
const port = process.env.PORT || 1500;
const { DefaultAzureCredential, ClientSecretCredential } = require('@azure/identity')
const { Client } = require('pg');

const credential = new DefaultAzureCredential();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.post('/data', (req, res) => {
  console.log('hey');
  console.log(req.body.hello);
  res.json({received: 'yes'});
});

app.listen(port, async () => {
  console.log(`App listening on http://localhost:${port}`);

  try {
    const accessToken = await credential.getToken('https://ossrdbms-aad.database.windows.net/.default');
    const client = new Client({
      host: process.env.AZURE_POSTGRESQL_HOST,
      user: process.env.AZURE_POSTGRESQL_USER,
      password: accessToken.token,
      database: process.env.AZURE_POSTGRESQL_DATABASE,
      port: Number(process.env.AZURE_POSTGRESQL_PORT),
      ssl: process.env.AZURE_POSTGRESQL_SSL
    });
    await client.connect();
    console.log('Connected to the database');
    await client.end();
    console.log('Disconnected from the database');
  } catch (err) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Error connecting to the database`, err);
  }
});
