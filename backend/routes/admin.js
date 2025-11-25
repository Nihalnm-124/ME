// backend/routes/admin.js

const express = require('express');

const router = express.Router();

const NGO = require('../models/NGO');

const Donation = require('../models/Donation');

const User = require('../models/User');

const auth = require('../middleware/auth');

const isAdmin = require('../middleware/isAdmin');



// All routes require auth + admin

router.use(auth, isAdmin);



// GET /api/admin/ngos - list all NGOs

router.get('/ngos', async (req, res) => {

  try {

    const ngos = await NGO.find().sort({ createdAt: -1 });

    res.json(ngos);

  } catch (err) {

    console.error(err.message);

    res.status(500).send('Server error');

  }

});



// PATCH /api/admin/ngos/:id/verify - approve or reject

router.patch('/ngos/:id/verify', async (req, res) => {

  try {

    const { verified } = req.body;

    const ngo = await NGO.findById(req.params.id);

    if (!ngo) return res.status(404).json({ msg: 'NGO not found' });

    ngo.verified = !!verified;

    await ngo.save();

    res.json(ngo);

  } catch (err) {

    console.error(err.message);

    res.status(500).send('Server error');

  }

});



// GET /api/admin/donations - list donations and simple aggregates

router.get('/donations', async (req, res) => {

  try {

    const donations = await Donation.find().sort({ createdAt: -1 }).limit(200).populate('ngo', 'name');

    const totalAgg = await Donation.aggregate([

      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }

    ]);

    res.json({ donations, summary: totalAgg[0] || { total: 0, count: 0 } });

  } catch (err) {

    console.error(err.message);

    res.status(500).send('Server error');

  }

});



// GET /api/admin/users - list users

router.get('/users', async (req, res) => {

  try {

    const users = await User.find().select('-password').sort({ createdAt: -1 }).limit(500);

    res.json(users);

  } catch (err) {

    console.error(err.message);

    res.status(500).send('Server error');

  }

});



// GET /api/admin/analytics - simple analytics

router.get('/analytics', async (req, res) => {

  try {

    const ngosCount = await NGO.countDocuments();

    const verifiedCount = await NGO.countDocuments({ verified: true });

    const usersCount = await User.countDocuments();

    const donationsAgg = await Donation.aggregate([

      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }

    ]);

    const donationsSummary = donationsAgg[0] || { total: 0, count: 0 };



    const topNGOs = await Donation.aggregate([

      { $group: { _id: '$ngo', total: { $sum: '$amount' }, count: { $sum: 1 } } },

      { $sort: { total: -1 } },

      { $limit: 5 },

      {

        $lookup: {

          from: 'ngos',

          localField: '_id',

          foreignField: '_id',

          as: 'ngo'

        }

      },

      { $unwind: { path: '$ngo', preserveNullAndEmptyArrays: true } },

      { $project: { total: 1, count: 1, 'ngo.name': 1 } }

    ]);



    res.json({

      ngosCount,

      verifiedCount,

      usersCount,

      donationsSummary,

      topNGOs

    });

  } catch (err) {

    console.error(err.message);

    res.status(500).send('Server error');

  }

});



module.exports = router;



