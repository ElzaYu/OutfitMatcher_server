/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("accessories").del();
  await knex("accessories").insert([
    {
      accessory_id: 1,
      category: "watch",
      brand: "Lime",
      color: "black",
      accessory_image:
        "https://cache-limeshop.cdnvideo.ru/limeshop/aa/760652488628c7e2dc5d511ee83cb00155dc81e05.jpeg",
    },
  ]);
};
