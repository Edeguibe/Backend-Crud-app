import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.model.js";

const app = express();
const PORT = 8000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// create a product
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

// update a product
app.put("/product/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete a product
app.delete("/product/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).send(product);
    console.log("Product deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
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
