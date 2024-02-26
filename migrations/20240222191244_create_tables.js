/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("accessories", (table) => {
      table.increments("accessory_id").primary();
      table.string("category").nullable();
      table.string("brand").nullable();
      table.string("color").nullable();
      table.string("accessory_image").unique();
    })
    .createTable("tops", (table) => {
      table.increments("top_id").primary();
      table.string("category").nullable();
      table.string("brand").nullable();
      table.string("color").nullable();
      table.string("top_image").unique();
    })
    .createTable("bottoms", (table) => {
      table.increments("bottom_id").primary();
      table.string("category").nullable();
      table.string("brand").nullable();
      table.string("color").nullable();
      table.string("bottom_image").unique();
    })
    .createTable("shoes", (table) => {
      table.increments("shoes_id").primary();
      table.string("category").nullable();
      table.string("brand").nullable();
      table.string("color").nullable();
      table.string("shoes_image").unique();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("accessories")
    .dropTable("tops")
    .dropTable("bottoms")
    .dropTable("shoes");
};
