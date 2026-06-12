import Product from "../models/Product.js";
import validateObjectId from "../utils/validateObjectId.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getProducts =
asyncHandler(
  async (req, res) => {
    const products =
      await Product.find();

    res.status(200).json({
      success: true,
      data: products,
    });
  }
);

// GET /products/:id

export const getProductById = async (
  req,
  res
) => {
  try {

    if (
      !validateObjectId(req.params.id)
    ) {
      return res.status(400).json({
        message: "Invalid Product ID",
      });
    }

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// POST /products
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      stock,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};