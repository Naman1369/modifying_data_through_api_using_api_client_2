const express = require("express");
const MenuItem = require("../models/MenuItem");

const router = express.Router();

// Update Menu Item (PUT /menu/:id)
router.put("/:id", async (req, res) => {
  const { name, description, price } = req.body;
  
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Invalid update request", error: error.message });
  }
});

// Delete Menu Item (DELETE /menu/:id)
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid delete request", error: error.message });
  }
});

module.exports = router;
