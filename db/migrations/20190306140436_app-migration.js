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

    .createTable("products", function (table) {
      table.increments("key");
      table.string("id").notNullable();
      table.string("name").notNullable();
      table.string("group").notNullable();
      table.string("backgroundColor").notNullable();
      table.string("textColor").notNullable();
      table.string("cartname").notNullable();
      table.string("barcode").notNullable();
      table.string("sallingprice").notNullable();
      table.string("initalPrice").notNullable();
      table.string("qnt").notNullable();
      table.string("alertOut").notNullable();
      table.string("amountInstore").notNullable();
      table.boolean("isInstore").notNullable();
      table.boolean("isTaxEnabled").notNullable();
      table.boolean("isMulity").notNullable();
      table.timestamp("date").defaultTo(knex.fn.now());
      table.timestamp("modified").defaultTo(knex.fn.now());
    })

    .createTable("inventory", function (table) {
      table.increments("key");
      table.string("name").notNullable();
      table.string("group").notNullable();
      table.string("backgroundColor").notNullable();
      table.string("textColor").notNullable();
      table.string("cartname").notNullable();
      table.string("barcode").notNullable();
      table.string("sallingprice").notNullable();
      table.string("initalPrice").notNullable();
      table.string("qnt").notNullable();
      table.string("alertOut").notNullable();
      table.string("amountInstore").notNullable();
      table.string("department").notNullable();
      table.boolean("isInstore").notNullable();
      table.boolean("isTaxEnabled").notNullable();
      table.boolean("isMulity").notNullable();
      table.timestamp("date").defaultTo(knex.fn.now());
      table.timestamp("modified").defaultTo(knex.fn.now());
    })

    .createTable("sales", function (table) {
      table.increments("key");
      table.string("id").notNullable();
      table.string("Year").notNullable();
      table.string("Day").notNullable();
      table.string("Month").notNullable();
      table.string("InvoiceNumber").notNullable();
      table.jsonb("TicketList").notNullable();
      table.jsonb("Customer").notNullable();
      table.integer("GrandTotal").notNullable();
      table.integer("AmountPaid").notNullable();
      table.integer("ChangeDue").notNullable();
      table.integer("Balance").notNullable();
      table.integer("Discount").notNullable();
      table.string("Date").notNullable();
      table.string("Department").notNullable();
      table.string("User").notNullable();
      table.string("PaymentType").notNullable();
      table.boolean("isTaxInvoice").notNullable();
      table.text("Note").notNullable();
      table.integer("totalTaxFinal").notNullable();
      table.integer("totalTax").notNullable();
      table.string("time").notNullable();
      table.timestamp("timestamp").defaultTo(knex.fn.now());
      table.timestamp("modified").defaultTo(knex.fn.now());
    })
  .createTable("departments_config", function (table) {
    table.increments("key");
    table.string("id").notNullable();
    table.string("dep_name").notNullable();
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
  return (
    knex.schema
      .dropTable("users")
      .dropTable("products")
      .dropTable("inventory")
      .dropTable("departments_config")
      .dropTable("sales")
  );
};
