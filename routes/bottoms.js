const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
// const { v4: uuidv4 } = require("uuid");

// get all the bottoms
router.get("/", async (_req, res) => {
  try {
    const data = await knex("bottoms");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving bottoms data`, error);
  }
});

// POST TO ADD A NEW ONE
router.post("/", async (req, res) => {
  try {
    const { bottom_id, category, brand, color, bottom_image } = req.body;

    // Insert the new bottom into the 'bottoms' table
    const [newBottomId] = await knex("bottoms").insert({
      category,
      brand,
      color,
      bottom_image,
    });

    // Fetch the newly added bottom from the database
    const newBottom = await knex("bottoms")
      .where("bottom_id", newBottomId)
      .first();

    // Send the newly added bottom as a JSON response
    res.status(201).send(newBottom);
  } catch (error) {
    // Handle errors by sending a 400 status code and an error message
    console.log(error);
    res.status(400).send({ error: "Failed create new bottom" });
  }
});

// DELETE
router.delete("/:bottom_id", async (req, res) => {
  const { bottom_id } = req.params;
  try {
    // Check if the bottom item exists
    const bottomItem = await knex("bottoms")
      .where("bottom_id", bottom_id)
      .first();
    if (!bottomItem) {
      return res.status(404).send();
    }
    // Delete the inventory item
    await knex("bottoms").where("bottom_id", bottom_id).del();
    res.status(204).send();
  } catch (error) {
    res.status(400).send({ error: "Failed to delete bottom item" });
  }
});

module.exports = router;
