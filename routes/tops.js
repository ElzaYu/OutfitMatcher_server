const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

// GET ALL
router.get("/", async (_req, res) => {
  try {
    const data = await knex("tops");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving tops data`, error);
  }
});

// POST TO ADD A NEW ONE
router.post("/", async (req, res) => {
  try {
    const { top_id, category, brand, color, top_image } = req.body;

    // Insert the new top into the 'tops' table
    const [newTopId] = await knex("tops").insert({
      category,
      brand,
      color,
      top_image,
    });

    // Fetch the newly added top from the database
    const newTop = await knex("tops").where("top_id", newTopId).first();

    // Send the newly added top as a JSON response
    res.status(201).send(newTop);
  } catch (error) {
    // Handle errors by sending a 400 status code and an error message
    console.log(error);
    res.status(400).send({ error: "Failed create new top" });
  }
});

// DELETE
router.delete("/:top_id", async (req, res) => {
  const { top_id } = req.params;
  try {
    // Check if the top item exists
    const topItem = await knex("tops").where("top_id", top_id).first();
    if (!topItem) {
      return res.status(404).send();
    }
    // Delete the inventory item
    await knex("tops").where("top_id", top_id).del();
    res.status(204).send();
  } catch (error) {
    res.status(400).send({ error: "Failed to delete top item" });
  }
});

module.exports = router;
