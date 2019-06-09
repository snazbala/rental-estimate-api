'use strict';
require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const Property = require('./models/Properties');

// Mock function to simulate an API call to get the estimate for the property
const getEstimate = () => ({
    fullHomeRent: 3732,
    renterRent: 2887,
    airbnbIncome: [1905, 2448, 3036, 3251, 3177, 2549, 1527, 1117, 1145, 1155, 1172, 1973],
});


// TODO: Replace * with deployed FE's domain
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
}

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  // pass the body to this function when this API is implemented
  const estimateForProperty = getEstimate();
  const parsedBody = JSON.parse(event.body);

  parsedBody.estimate = estimateForProperty;

  connectToDatabase()
    .then(() => {
      Property.create(parsedBody)
        .then((property) => callback(null, {
          statusCode: 200,
          body: JSON.stringify(property),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST',
          },
        }))
        .catch((err) => callback(null, {
          statusCode: err.statusCode || 500,
          body: JSON.stringify(err),
          headers: { 'Content-Type': 'text/plain' }
        }));
        // TODO: Handle argument errors (400) for missing fields
    });
};

module.exports.options = (event, context, callback) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(event.body),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, User-Agent, Referer',
      },
    });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Property.findById(event.pathParameters.id)
        .then((property) => callback(null, {
          statusCode: 200,
          body: JSON.stringify(property),
          headers: {
            ...headers,
            'Access-Control-Allow-Methods': 'GET',
          },
        }))
        .catch((err) => callback(null, {
          statusCode: err.statusCode || 500,
          body: 'Could not fetch the property.',
          headers: { 'Content-Type': 'text/plain' },
        }));
    });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Property.find()
        .then((properties) => callback(null, {
          statusCode: 200,
          body: JSON.stringify(properties),
          headers: {
            ...headers,
            'Access-Control-Allow-Methods': 'GET',
          },
        }))
        .catch((err) => callback(null, {
          statusCode: err.statusCode || 500,
          body: 'Could not fetch the properties.',
          headers: { 'Content-Type': 'text/plain' }
        }))
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Property.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then((property) => callback(null, {
          statusCode: 200,
          body: JSON.stringify(property),
          headers: {
            ...headers,
            'Access-Control-Allow-Methods': 'GET',
          },
        }))
        .catch((err) => callback(null, {
          statusCode: err.statusCode || 500,
          body: 'Could not fetch the properties.',
          headers: { 'Content-Type': 'text/plain' }
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Property.findByIdAndRemove(event.pathParameters.id)
        .then((property) => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Removed property with id: ' + property._id, property: property }),
          headers: {
            ...headers,
            'Access-Control-Allow-Methods': 'GET',
          },
        }))
        .catch((err) => callback(null, {
          statusCode: err.statusCode || 500,
          body: 'Could not fetch the properties.',
          headers: { 'Content-Type': 'text/plain' }
        }));
    });
};