import express from "express";
import mongoose from "mongoose";
import productRoute from "./routes/product.route.js";

const app = express();
const PORT = 8000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(
    "mongodb+srv://guibedpaz:bEFa0d4jxLPIhVge@backenddb.nxriub7.mongodb.net/node-api?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
