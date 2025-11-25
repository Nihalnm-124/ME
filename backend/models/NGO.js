const mongoose = require('mongoose');



const NGOSchema = new mongoose.Schema({

  name: { type: String, required: true },

  description: String,

  cause: String,

  location: String,

  contactEmail: String,

  website: String,

  image: String,

  verified: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now }

});



module.exports = mongoose.model('NGO', NGOSchema);



