const express = require('express');
const fetch = require('node-fetch');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Routes

app.get('/api/wpengine', async function(req, res) {
  const authorization = 'Basic ' + Buffer.from(process.env.WPENGINE_AUTH).toString('base64');
  const wpengineInstalls = process.env.WPENGINE_INSTALLS;

  let responseBody = 'Nothing returned.'; 

  const getWPengineData = async url => {
    try {
      const wpengineResponse = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': authorization,
        }
      });
      responseBody = await wpengineResponse.json();
      console.log(responseBody);
      res.send(responseBody);
    } catch (error) {
      console.log(error);
      res.send({
        express: 
          {
            'Error': 'Could not connect to API.',
            'Error Details': error,
          }
      });
    }
  }

  getWPengineData(wpengineInstalls);
});

app.get('/api/codebase', async function(req, res) {
  const codebaseURL = process.env.CODEBASE_URL.concat('?key=', process.env.CODEBASE_API_KEY);

  let responseBody = 'Nothing returned.'; 

  const getCodebaseData = async url => {
    try {
      const codebaseResponse = await fetch(url);
      responseBody = await codebaseResponse.json();
      res.send(responseBody);
    } catch (error) {
      res.send({
        express: 
          {
            'Error': 'Could not connect to API.',
            'Error Details': error,
          }
      });
    }
  }

  getCodebaseData(codebaseURL);
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello from Express!' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));