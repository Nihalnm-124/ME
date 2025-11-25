// backend/middleware/isAdmin.js

const User = require('../models/User');



module.exports = async function (req, res, next) {

  try {

    if (!req.user || !req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

    const user = await User.findById(req.user.id);

    if (!user || user.role !== 'admin') return res.status(403).json({ msg: 'Admin only' });

    next();

  } catch (err) {

    console.error(err);

    res.status(500).send('Server error');

  }

};



