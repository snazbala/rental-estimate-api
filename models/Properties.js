const mongoose = require('mongoose');

const requiredString = {
  type: String,
  required: true,
};

const requiredNumber = {
    type: Number,
    required: true,
};

const PropertiesSchema = new mongoose.Schema({
  emailAddress: requiredString,
  address: {
    address1: requiredString,
    address2: String,
    city: requiredString,
    state: requiredString,
    zipCode: requiredString,
  },
  numBedrooms: requiredNumber,
  numBathrooms: requiredNumber,
  sqFt: requiredNumber,
  estimate: {
    fullHomeRent: Number,
    renterRent: Number,
    airbnbIncome: [Number],
  },
  offer: Number,
});
module.exports = mongoose.model('Property', PropertiesSchema);