const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resumeSchema = new Schema({
  // -------------------------------------------------personal information--------------------------------
  fname: {
    type: String,
    required: [true, 'fname is required']
  },
  lname: {
    type: String,
    required: [true, 'lname is required']
  },
  address: {
    type: String,
    required: [true, 'address should be entered to make a resume']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  zipCode: {
    type: Number,
    required: [true, 'zipcode ios compulsory']
  },
  country: {
    type: String,
    required: [true, "Country name is required"]
  },
  email: {
    type: String,
    required: [true, 'Email Address Is Required'],
    unique: [true, 'The Same Email already exists']
  },
  phone: {
    type: Number,
    required:[true ,'Phone Number is required']
  },

  // --------------------------------------------------summary------------------------------------

  summary: String,

  // --------------------------------------------------education-----------------------------------------

  school: String,
  field: String,
  degree: String,
  graduationDate: Date,
  experience: [String],


  // --------------------------------------------------------------skill----------------------------------

  talent: [{
    skill: String,
    level: Number
  }],

  // ----------------------------------------------------------------------language-------------------------------
  language: [String],

  // --------------------------------------------------------hobby & awards---------------------------
  hobby: [String],
  awards: [String],

  // -------------------------------------------portfolio-------------------------------------
  portfolio: [{
    title: String,
    desc: String,
    skill: [String],
    image: [String]
  }]
});

const Resume = mongoose.model('resume', resumeSchema);
module.exports = Resume;