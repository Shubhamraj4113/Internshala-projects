import express from "express";

import authMiddleware
from "../middleware/authMiddleware.js";

import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getCart
);

router.post(
  "/",
  authMiddleware,
  addToCart
);

router.put(
  "/:id",
  authMiddleware,
  updateCartItem
);

router.delete(
  "/:id",
  authMiddleware,
  removeCartItem
);

export default router;