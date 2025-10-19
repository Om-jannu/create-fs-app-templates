import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017/my-app?authSource=admin';
    
    await mongoose.connect(mongoUri);
    
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('❌ Database disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ Database error:', error);
});

