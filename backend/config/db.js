const mongoose = require('mongoose');


mongoose.connection.on('connected', () => {
  console.log('Connected');
});

mongoose.connection.on('error', (err) => {
  console.error('connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log(' Disconnected');
});

// close connection 
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lead-management';

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection failed:', error);

    if (process.env.NODE_ENV === 'development') {
      process.exit(1);
    }
    throw error;
  }
};


const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

module.exports = { connectDB, isConnected };
