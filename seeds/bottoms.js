/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("bottoms").del();
  await knex("bottoms").insert([
    {
      bottom_id: 1,
      category: "short",
      brand: "Lime",
      color: "black",
      bottom_image:
        "https://cache-limeshop.cdnvideo.ru/limeshop/aa/760652488628c7e2dc5d511ee83cb00155dc81e05.jpeg",
    },
    {
      bottom_id: 2,
      category: "jeans",
      brand: "Lime",
      color: "blue",
      bottom_image:
        "https://cache-limeshop.cdnvideo.ru/limeshop/aa/761849073bb4789d98bb5491499a640d375c64be3.jpg",
    },
    {
      bottom_id: 3,
      category: "jeans",
      brand: "Lime",
      color: "black",
      bottom_image:
        "https://cache-limeshop.cdnvideo.ru/limeshop/aa/7611572012a1f84b566fc4d30bf238fc299d8ed41.jpg",
    },
    {
      bottom_id: 4,
      category: "trousers",
      brand: "Lime",
      color: "black",
      bottom_image:
        "https://cache-limeshop.cdnvideo.ru/limeshop/aa/760651893628c7e21c5d511ee83cb00155dc81e05.jpeg",
    },
  ]);
};
