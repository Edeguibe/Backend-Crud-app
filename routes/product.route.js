import express from "express";
import Product from "../models/product.model.js";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const Router = express.Router();

Router.get("/", getProducts);

Router.get("/:id", getProduct);

Router.post("/", createProduct);

Router.put("/:id", updateProduct);

Router.delete("/:id", deleteProduct);

export default Router;
