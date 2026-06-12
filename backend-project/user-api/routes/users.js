const express = require("express");
const router = express.Router();
const validateUser = require("../middleware/validateUser");

// In-memory data source
let users = [
  {
    id: "1",
    firstName: "Anshika",
    lastName: "Agarwal",
    hobby: "Teaching",
  },
];

// GET all users
router.get("/users", (req, res) => {
  res.status(200).json(users);
});

// GET user by ID
router.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json(user);
});

// POST new user
router.post("/user", validateUser, (req, res) => {
  const { firstName, lastName, hobby } = req.body;

  const newUser = {
    id: String(users.length + 1),
    firstName,
    lastName,
    hobby,
  };

  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    user: newUser,
  });
});

// PUT update user
router.put("/user/:id", validateUser, (req, res) => {
  const index = users.findIndex(
    (u) => u.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  users[index] = {
    id: req.params.id,
    ...req.body,
  };

  res.status(200).json({
    message: "User updated successfully",
    user: users[index],
  });
});

// DELETE user
router.delete("/user/:id", (req, res) => {
  const index = users.findIndex(
    (u) => u.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  users.splice(index, 1);

  res.status(200).json({
    message: "User deleted successfully",
  });
});

module.exports = router;