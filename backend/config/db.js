const mongoose = require('mongoose');

let memoryServer;

const connectDB = async (uri) => {
  try {
    let connectionUri = uri;

    if (!connectionUri) {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      connectionUri = memoryServer.getUri();
      console.warn('MONGODB_URI not provided. Using in-memory MongoDB instance.');
    }

    await mongoose.connect(connectionUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err);
    process.exit(1);
  }
};

const gracefulShutdown = async () => {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

module.exports = connectDB;



