import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      if (!productId) {
        return res.status(400).json({
          message: "Product ID required",
        });
      }

      if (
        quantity >
        product.stockQuantity
      ) {
        return res.status(400).json({
          message:
            "Insufficient stock available",
        });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        item => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      if (
        quantity &&
        quantity < 1
      ) {
        return res.status(400).json({
          message:
            "Quantity must be greater than 0",
        });
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        item => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      if (
        quantity &&
        quantity < 1
      ) {
        return res.status(400).json({
          message:
            "Quantity must be greater than 0",
        });
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;