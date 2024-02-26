const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
// const { v4: uuidv4 } = require("uuid");

// get all the tops
router.get("/", async (_req, res) => {
  try {
    const data = await knex("favourite_outfits");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving tops data`, error);
  }
});

// const topsData = await knex("tops").select("*");
// for (const top of topsData) {
//   await knex("favourite_outfits").insert({
//     top_id: top.top_id,
//   });
// }

// const bottomsData = await knex("bottoms").select("*");
// for (const bottom of bottomsData) {
//   await knex("favourite_outfits").insert({
//     bottom_id: bottom.bottom_id,
//     // other columns as needed
//   });
// }

// POST request to add a new warehouse
router.post("/", async (req, res) => {
  try {
    const {
      id,
      accessory_id,
      accessory_image,
      top_id,
      top_image,
      bottom_id,
      bottom_image,
      shoes_id,
      shoes_image,
    } = req.body;
    console.log("Received request:", req.body);

    // Insert the new warehouse into the 'warehouses' table
    const [newFavouriteOutfitId] = await knex("favourite_outfits").insert({
      accessory_id,
      accessory_image,
      top_id,
      top_image,
      bottom_id,
      bottom_image,
      shoes_id,
      shoes_image,
    });

    // Fetch the newly added warehouse from the database
    const newFavouriteOutfit = await knex("favourite_outfits")
      .where("id", newFavouriteOutfitId)
      .first();

    // Send the newly added warehouse as a JSON response
    res.status(201).send(newFavouriteOutfit);
  } catch (error) {
    // Handle errors by sending a 400 status code and an error message
    console.log(error);
    res.status(400).send({ error: "Failed create new warehouse" });
  }
});

// DELETE request to delete a single outfit item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the outfit item exists
    const outfitItem = await knex("favourite_outfits").where("id", id).first();
    if (!outfitItem) {
      return res.status(404).send();
    }
    // Delete the outfit item
    await knex("favourite_outfits").where("id", id).del();
    res.status(204).send();
  } catch (error) {
    res.status(400).send({ error: "Failed to delete outfit item" });
  }
});

module.exports = router;
