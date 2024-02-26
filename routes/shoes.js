const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

// GET ALL
router.get("/", async (_req, res) => {
  try {
    const data = await knex("shoes");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving shoes data`, error);
  }
});

// POST TO ADD A NEW ONE
router.post("/", async (req, res) => {
  try {
    const { shoes_id, category, brand, color, shoes_image } = req.body;

    // Insert the new shoes into the 'shoes' table
    const [newShoesId] = await knex("shoes").insert({
      category,
      brand,
      color,
      shoes_image,
    });

    // Fetch the newly added shoes from the database
    const newShoes = await knex("shoes").where("shoes_id", newShoesId).first();

    // Send the newly added shoes as a JSON response
    res.status(201).send(newShoes);
  } catch (error) {
    // Handle errors by sending a 400 status code and an error message
    console.log(error);
    res.status(400).send({ error: "Failed create new shoes" });
  }
});

// DELETE
router.delete("/:shoes_id", async (req, res) => {
  const { shoes_id } = req.params;
  try {
    // Check if the top item exists
    const shoesItem = await knex("shoes").where("shoes_id", shoes_id).first();
    if (!shoesItem) {
      return res.status(404).send();
    }
    // Delete the inventory item
    await knex("shoes").where("shoes_id", shoes_id).del();
    res.status(204).send();
  } catch (error) {
    res.status(400).send({ error: "Failed to delete shoes item" });
  }
});

module.exports = router;
