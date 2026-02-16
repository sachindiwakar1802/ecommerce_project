import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

// Connect Database First
connectDb();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // <-- change to your frontend port
    credentials: true,
  })
);

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("hello sachin im ready to fly");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});