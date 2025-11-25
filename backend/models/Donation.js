const mongoose = require('mongoose');



const DonationSchema = new mongoose.Schema({

  donorName: String,

  donorEmail: String,

  amount: Number,

  ngo: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO' },

  createdAt: { type: Date, default: Date.now }

});



module.exports = mongoose.model('Donation', DonationSchema);



