import mongoose from 'mongoose';

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

const connectToDatabase = async () => {
  try {
    const {
      MONGO_HOST,
      MONGO_PORT,
      MONGO_DATABASE,
    } = process.env;

    await mongoose.connect(
      `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
      dbOptions,
    );

    console.log(`Connected to database: ${MONGO_DATABASE}`);

  } catch (error) {
    console.log(error);
  }
};

export default { connectToDatabase };
