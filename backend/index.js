import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();  
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend çalışıyor 🚀");
});


// MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB bağlandı ✅"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server 5000 portunda çalışıyor"));
