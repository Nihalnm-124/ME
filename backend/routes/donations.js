const express = require('express');

const router = express.Router();

const Donation = require('../models/Donation');

const NGO = require('../models/NGO');



// Create donation (simple flow — simulated)

router.post('/', async (req, res) => {

  try {

    const { donorName, donorEmail, amount, ngoId } = req.body;

    const ngo = await NGO.findById(ngoId);

    if (!ngo) return res.status(404).json({ msg: 'NGO not found' });

    const donation = new Donation({ donorName, donorEmail, amount, ngo: ngoId });

    await donation.save();

    res.json(donation);

  } catch (err) {

    console.error(err.message);

    res.status(500).send('Server error');

  }

});



// Get donations for an NGO

router.get('/ngo/:id', async (req, res) => {

  try {

    const donations = await Donation.find({ ngo: req.params.id }).sort({ createdAt: -1 });

    res.json(donations);

  } catch (err) {

    console.error(err.message);

    res.status(500).send('Server error');

  }

});



module.exports = router;



