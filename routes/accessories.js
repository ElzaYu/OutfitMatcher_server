const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

// GET ALL
router.get("/", async (_req, res) => {
  try {
    const data = await knex("accessories");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving accessories data`, error);
  }
});

// POST TO ADD A NEW ONE
router.post("/", async (req, res) => {
  try {
    const { accessory_id, category, brand, color, accessory_image } = req.body;

    const [newAccessoryId] = await knex("accessories").insert({
      category,
      brand,
      color,
      accessory_image,
    });

    const newAccessory = await knex("accessories")
      .where("accessory_id", newAccessoryId)
      .first();

    res.status(201).send(newAccessory);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Failed create new accessory" });
  }
});

// DELETE
router.delete("/:accessory_id", async (req, res) => {
  const { accessory_id } = req.params;
  try {
    // Check if the top item exists
    const accessoryItem = await knex("accessories")
      .where("accessory_id", accessory_id)
      .first();
    if (!accessoryItem) {
      return res.status(404).send();
    }
    // Delete the inventory item
    await knex("accessories").where("accessory_id", accessory_id).del();
    res.status(204).send();
  } catch (error) {
    res.status(400).send({ error: "Failed to delete accessory item" });
  }
});

module.exports = router;
