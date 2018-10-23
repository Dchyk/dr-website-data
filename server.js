const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Routes for API calls
app.get('/api/wpengine', function(req, res) {
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

app.get('/api/codebase', function(req, res) {
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // React routing - return all non-API requests to React
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build',
    'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));