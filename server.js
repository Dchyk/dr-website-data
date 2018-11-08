const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Routes for API calls
app.get('/api/wpengine/:offset', function(req, res) {
  const authorization = 'Basic ' + Buffer.from(process.env.WPENGINE_AUTH).toString('base64');
  const offset = req.params.offset;
  const wpengineInstalls = process.env.WPENGINE_INSTALLS.concat(offset);

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
      console.log('WPEngine response: ', responseBody)
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

app.get('/api/cloudflare', function(req, res) {
  const cloudflareURL = process.env.CLOUDFLARE_GET_ALL_ZONES;
  const email = process.env.CLOUDFLARE_EMAIL;
  const authkey = process.env.CLOUDFLARE_API_KEY;
  
  let responseBody = 'Nothing returned.';

  const getCloudflareZones = async url => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'X-Auth-Email': email,
          'X-Auth-Key': authkey,
        }
      });

      responseBody = await response.json();
      res.send(responseBody);
    } catch(error) {
      res.send({
        express: 
          {
            'Error': 'Could not connect to API.',
            'Error Details': error,
          }
      });
    }
  }

  getCloudflareZones(cloudflareURL);
});

app.get('/api/wp-latest-post', function(req, res) {
  // Pass the domain in as a URL param in the request
  const domain = req.param('domain');

  // Then build the full request path
  const requestPath = domain.concat('/wp-json/wp/v2/posts?per_page=1');

  let responseBody = 'Nothing returned.';

  const getLatestPost = async url => {
    try {
      const response = await fetch(url);
      responseBody = await response.json();
      console.log("cloudflare response: ", responseBody);
      res.send(responseBody);
    } catch(error) {
      res.send({
        express: 
          {
            'Error': 'Could not connect to API.',
            'Error Details': error,
          }
      });
    }
  }

  getLatestPost(requestPath);
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