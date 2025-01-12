const mongoose = require('mongoose');

const connectMongoDB = async (PORT) => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: process.env.MONGO_DB_NAME, // Veritabanı adı burada belirtiliyor
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    });
    console.log(`Server Started at Port ${PORT}`),
    
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = { connectMongoDB };