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
          body: JSON.stringify(property)
        }))
        .catch((err) => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the property.'
        }));
        // TODO: Handle argument errors (400) for missing fields
    });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Property.findById(event.pathParameters.id)
        .then((property) => callback(null, {
          statusCode: 200,
          body: JSON.stringify(property)
        }))
        .catch((err) => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the property.'
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
          body: JSON.stringify(properties)
        }))
        .catch((err) => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the properties.'
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
          body: JSON.stringify(property)
        }))
        .catch((err) => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the properties.'
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
          body: JSON.stringify({ message: 'Removed property with id: ' + property._id, property: property })
        }))
        .catch((err) => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the properties.'
        }));
    });
};