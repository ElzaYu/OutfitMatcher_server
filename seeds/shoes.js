/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("shoes").del();
  await knex("shoes").insert([
    {
      shoes_id: 1,
      category: "heels",
      brand: "Lime",
      color: "black",
      shoes_image:
        "https://cache-limeshop.cdnvideo.ru/limeshop/aa/760652488628c7e2dc5d511ee83cb00155dc81e05.jpeg",
    },
  ]);
};
