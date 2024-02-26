/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tops").del();
  await knex("tops").insert([
    {
      top_id: 1,
      category: "shirt",
      brand: "Lime",
      color: "blue",
      top_image:
        "https://cache-limeshop.cdnvideo.ru/limeshop/aa/760732497628c7e07c5d511ee83cb00155dc81e05.jpeg",
    },
    {
      top_id: 2,
      category: "crop",
      brand: "Lime",
      color: "black",
      top_image:
        "https://cache-limeshop.cdnvideo.ru/limeshop/aa/755105632393add61936a11ee9de800155d011401.jpeg",
    },
    {
      top_id: 3,
      category: "t-shirt",
      brand: "Lime",
      color: "grey",
      top_image:
        "https://cache-limeshop.cdnvideo.ru/limeshop/aa/7556227374c8e0b49981b11ee83c300155dc81e05.jpeg",
    },
    {
      top_id: 4,
      category: "vest",
      brand: "Lime",
      color: "brown",
      top_image:
        "https://cache-limeshop.cdnvideo.ru/limeshop/aa/75950065194551a49bb5d11ee83ca00155dc81e05.jpeg",
    },
    {
      top_id: 5,
      category: "dress",
      brand: "Lime",
      color: "black",
      top_image:
        "https://cache-limeshop.cdnvideo.ru/limeshop/aa/758237492751183c6afe211ee83c600155dc81e05.jpeg",
    },
  ]);
};
