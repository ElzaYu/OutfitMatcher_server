/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("favourite_outfits").del();
  await knex("favourite_outfits").insert([{}]);
};
