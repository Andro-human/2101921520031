import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL ?? "");
    console.log(`connected To MongoDb Database ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`MongoDb Database Error ${error}`);
  }
};

export default connectDB;
