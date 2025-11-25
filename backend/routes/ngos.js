const express = require('express');

const router = express.Router();

const NGO = require('../models/NGO');

const auth = require('../middleware/auth');



// Create NGO (protected)

router.post('/', auth, async (req, res) => {

  try {

    const ngo = new NGO(req.body);

    await ngo.save();

    res.json(ngo);

  } catch (err) {

    console.error(err.message);

    res.status(500).send('Server error');

  }

});



// Get NGOs (with simple filters)

router.get('/', async (req, res) => {

  try {

    const { q, location, cause } = req.query;

    const filter = {};

    if (q) filter.name = { $regex: q, $options: 'i' };

    if (location) filter.location = { $regex: location, $options: 'i' };

    if (cause) filter.cause = { $regex: cause, $options: 'i' };

    const ngos = await NGO.find(filter).limit(100);

    res.json(ngos);

  } catch (err) {

    console.error(err.message);

    res.status(500).send('Server error');

  }

});



// Get single NGO

router.get('/:id', async (req, res) => {

  try {

    const ngo = await NGO.findById(req.params.id);

    if (!ngo) return res.status(404).json({ msg: 'NGO not found' });

    res.json(ngo);

  } catch (err) {

    console.error(err.message);

    res.status(500).send('Server error');

  }

});



module.exports = router;



