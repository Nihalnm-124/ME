require('dotenv').config();
const connectDB = require('./config/db');

(async () => {
  await connectDB(process.env.MONGODB_URI);
  console.log('Connection check complete');
  process.exit(0);
})();



