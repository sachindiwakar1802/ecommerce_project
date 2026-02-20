import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB CONNECTED SUCCESSFULLY SACHIN....");
  } catch (error) {
    console.log("DB error:", error.message);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDb;