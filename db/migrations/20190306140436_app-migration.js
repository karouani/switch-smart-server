exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id");
      table.string("user_id").notNullable();
      table.string("Password").notNullable();
      table.string("NotificationId").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("databass", function (table) {
      table.increments("key");
      table.string("dbName").notNullable();
      table.boolean("isAverabel").notNullable();
      table.timestamp("date").defaultTo(knex.fn.now());
      table.timestamp("modified").defaultTo(knex.fn.now());
    })
    .createTable("all_Tabs", function (table) {
      table.increments("key");
      table.string("id").notNullable();
      table.string("tabname").notNullable();
      table.string("background").notNullable();
      table.string("color").notNullable();
      table.string("buttonType").notNullable();
      table.boolean("isInstore").notNullable();
      table.timestamp("date").defaultTo(knex.fn.now());
      table.timestamp("modified").defaultTo(knex.fn.now());
    })
    .createTable("all_products", function (table) {
      table.increments("key");
      table.string("productKey").notNullable();
      table.string("group").notNullable();
      table.string("category").notNullable();
      table.string("ItemName").notNullable();
      table.string("barcode1").notNullable();
      table.string("barcode2").notNullable();
      table.string("barcode3").notNullable();
      table.string("barcode4").notNullable();
      table.string("barcode5").notNullable();
      table.integer("sallingprice").notNullable();
      table.integer("initalPrice").notNullable();
      table.integer("qnt").notNullable();
      table.integer("multiplier").notNullable();
      table.integer("alertOut").notNullable();
      table.integer("amountInstore").notNullable();
      table.boolean("sync").notNullable();
      table.boolean("isInstore").notNullable();
      table.boolean("isTaxEnabled").notNullable();
      table.boolean("isMulity").notNullable();
      table.timestamp("date").defaultTo(knex.fn.now());
      table.timestamp("modified").defaultTo(knex.fn.now());
    })
    .createTable("all_mulitProducts", function (table) {
      table.increments("key");
      table.string("id").notNullable();
      table.string("productName").notNullable();
      table.integer("sallingprice").notNullable();
      table.integer("initalPrice").notNullable();
      table.integer("qnt").notNullable();
      table.string("barcode1").notNullable();
      table.string("barcode2").notNullable();
      table.string("barcode3").notNullable();
      table.string("barcode4").notNullable();
      table.string("barcode5").notNullable();
      table.integer("alertOut").notNullable();
      table.integer("amountInstore").notNullable();
      table.boolean("isInstore").notNullable();
      table.timestamp("date").defaultTo(knex.fn.now());
      table.timestamp("modified").defaultTo(knex.fn.now());
    })
    .createTable("departments_config", function (table) {
      table.increments("key");
      table.string("id").notNullable();
      table.string("dep_name").notNullable();
      table.string("db_name").notNullable();
      table.string("theme").notNullable();
      table.string("phone").notNullable();
      table.string("shopNo").notNullable();
      table.string("road").notNullable();
      table.string("state").notNullable();
      table.string("country").notNullable();
      table.string("tpin").notNullable();
      table.string("taxType").notNullable();
      table.integer("taxRat").notNullable();
      table.jsonb("date").notNullable();
      table.jsonb("user").notNullable();
      table.jsonb("notifications").notNullable();
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable("users")
    .dropTable("all_Tabs")
    .dropTable("all_products")
    .dropTable("all_mulitProducts")
    .dropTable("databass")
    .dropTable("departments_config");
};
