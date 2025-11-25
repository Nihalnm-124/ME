require('dotenv').config();

const connectDB = require('./config/db');

const NGO = require('./models/NGO');

const User = require('./models/User');

const bcrypt = require('bcryptjs');



(async ()=>{

  await connectDB(process.env.MONGODB_URI);



  // seed NGOs

  await NGO.deleteMany({});

  const ngos = [

    { name: 'Hope for All', description: 'Education for underprivileged children', cause: 'Education', location: 'Chennai', contactEmail: 'hello@hope.org' },

    { name: 'Clean Water Initiative', description: 'WASH projects', cause: 'Health', location: 'Coimbatore', contactEmail: 'contact@cwi.org' },

    { name: 'Rural Livelihoods', description: 'Skill training and microfinance', cause: 'Livelihood', location: 'Madurai', contactEmail: 'info@rural.org' }

  ];

  await NGO.insertMany(ngos);

  console.log('Seeded NGOs');



  // create admin user if not exists

  const adminEmail = 'admin@janconnect.local';

  let admin = await User.findOne({ email: adminEmail });

  if (!admin) {

    const hashed = await bcrypt.hash('Admin@123', 10);

    admin = new User({ name: 'Admin', email: adminEmail, password: hashed, role: 'admin' });

    await admin.save();

    console.log('Admin user created: admin@janconnect.local / Admin@123');

  } else {

    console.log('Admin user already exists');

  }



  process.exit(0);

})();



