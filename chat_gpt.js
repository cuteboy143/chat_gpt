const request = require('request');
const url = require('url');
const querystring = require('querystring');

// Replace the value with your short URL and new tag ID
const shortUrl = 'https://amzn.to/3Yf6wEm';
const newTagId = 'HARDIK';

// Fetch the final URL
request({ url: shortUrl, followRedirect: true }, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    // Parse the final URL and extract the query string parameters
    const urlParts = url.parse(response.request.uri.href, true);
    const queryParams = urlParts.query;

    // Modify the "tag-id" parameter with the new tag ID
    queryParams['tag'] = newTagId;

    // Remove all parameters after the "tag-id" parameter
    let paramIndex = Object.keys(queryParams).indexOf('tag-id');
    if (paramIndex >= 0) {
      queryParams = Object.fromEntries(Object.entries(queryParams).slice(0, paramIndex + 1));
    }

    // Rebuild the query string and update the final URL
    const newQuery = querystring.stringify(queryParams);
    const updatedUrl = urlParts.protocol + '//' + urlParts.host + urlParts.pathname + '?' + newQuery;

    // Print the updated URL

    const slipt = updatedUrl.split("&")
   
    const dev = slipt[0]+"&"+slipt[1]+"&"+slipt[2];
    console.log(dev)
    console.log(updatedUrl);
  } else {
    console.error('Error fetching URL:', error);
  }
});
