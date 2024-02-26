/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("favourite_outfits", (table) => {
    table.increments("id").primary();
    table
      .integer("accessory_id")
      .unsigned()
      .index()
      .references("accessories.accessory_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .string("accessory_image")
      .references("accessories.accessory_image")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("top_id")
      .unsigned()
      .index()
      .references("tops.top_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .string("top_image")
      .references("tops.top_image")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("bottom_id")
      .unsigned()
      .index()
      .references("bottoms.bottom_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .string("bottom_image")
      .references("bottoms.bottom_image")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("shoes_id")
      .unsigned()
      .index()
      .references("shoes.shoes_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .string("shoes_image")
      .references("shoes.shoes_image")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("favourite_outfits");
};
