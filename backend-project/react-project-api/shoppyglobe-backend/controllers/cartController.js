import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// POST /cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } =
      req.body;

    const product =
      await Product.findById(
        productId
      );

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    const existingItem =
      await Cart.findOne({
        userId: req.user._id,
        productId,
      });

    if (existingItem) {
      existingItem.quantity +=
        quantity || 1;

      await existingItem.save();

      return res.status(200).json(
        existingItem
      );
    }

    const cartItem =
      await Cart.create({
        userId: req.user._id,
        productId,
        quantity: quantity || 1,
      });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const cartItem =
      await Cart.findById(
        req.params.id
      );

    if (!cartItem) {
      return res.status(404).json({
        message:
          "Cart item not found",
      });
    }

    if (
      req.body.quantity < 1
    ) {
      return res.status(400).json({
        message:
          "Quantity must be at least 1",
      });
    }

    cartItem.quantity =
      req.body.quantity;

    await cartItem.save();

    res.status(200).json(
      cartItem
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

  if (
    cartItem.userId.toString() !==
    req.user._id.toString()
  ) {
    return res.status(403).json({
      message: "Access denied",
    });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const cartItem =
      await Cart.findById(
        req.params.id
      );

    if (!cartItem) {
      return res.status(404).json({
        message:
          "Cart item not found",
      });
    }

    await cartItem.deleteOne();

    res.status(200).json({
      message:
        "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

  if (
    cartItem.userId.toString() !==
    req.user._id.toString()
  ) {
    return res.status(403).json({
      message: "Access denied",
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cart =
      await Cart.find({
        userId: req.user._id,
      }).populate("productId");

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
};