/*
 * Basically taken wholesale from the http connection example at
 * https://nodejs.org/docs/latest-v6.x/api/http.html#http_http_get_options_callback
 */
const http = require('https');
exports.handler = (event, context, callback) => {
  const GOOGLE_CIVIC_API_KEY = process.env.GOOGLE_CIVIC_API_KEY;
  const baseUrl = 'https://www.googleapis.com/civicinfo/v2/representatives';
  const configParams = 'levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody&includeOffices=true'
  const { address, } = event.queryStringParameters;
  const encodedAddress = encodeURIComponent(address);
  const params = `key=${GOOGLE_CIVIC_API_KEY}&address=${encodedAddress}&${configParams}`;
  const url = `${baseUrl}?${params}`;

  const response = {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Accept-Encoding',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
    },
    body: JSON.stringify({ event: event, context: context })
  };
  const req = http.get(url, (res) => {
    const statusCode = res.statusCode;
    const contentType = res.headers['content-type'];

    let error;
    if (!/^application\/json/.test(contentType)) {
      error = new Error(`Invalid content-type.\nExpected application/json but received ${contentType}`);
    }
    if (error) {
      console.log(error.message);
      // consume response data to free up memory
      res.resume();
      response.statusCode = 500;
      response.body = JSON.stringify({
        error: error.message,
      });
      return;
    }
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
      try {
        response.statusCode = statusCode;
        response.body = rawData;
        callback(null, response);
      } catch (e) {
        console.log(`Got error: ${e.message}`);
        response.statusCode = 500;
        response.body = JSON.stringify({
          error: e.message,
        });
        callback(null, response);
      }
    })
  });
  req.on('error', (e) => {
    console.log(`Got error: ${e.message}`);
    response.statusCode = 500;
    response.body = JSON.stringify({
      error: e.message,
    });
    callback(null, response);
  });
};
