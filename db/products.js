const knex = require("../knex"); // the connection!
const uuidv4 = require("uuid/v4");
const moment = require("moment");

function CreateId() {
  return uuidv4();
}

function GetData(props, hook, callback) {
  hook
    .select()
    .from(props.table)
    .where(props.id, props.value)
    .then(function (data) {
      callback({
        data,
      });
    });
}

module.exports = {
  HandelNewProducts(props, sendCallback) {
    var isMulity = false;
    var multi = [];

    switch (props.data._type) {
      case "set":
        var recipe =
          props.data.recipe === "" ? props.data.group.group : props.data.recipe;
        var productKey = CreateId();
        if (props.data.portion.length !== 1) isMulity = true;

        GetData(
          { table: "Tabs", id: "tabname", value: props.data.group.group },
          knex,
          (callback) => {
            if (callback.data.length === 0) {
              knex("Tabs")
                .insert({
                  id: CreateId(),
                  tabname: props.data.group.group,
                  background: props.data.group.colors.backgroundColor,
                  color: props.data.group.colors.textColor,
                  buttonType: "default",
                  isInstore: false,
                  isTaxEnabled: true,
                  department: props.from,
                })
                .then(function () {
                  knex("all_Tabs")
                    .insert({
                      id: CreateId(),
                      tabname: props.data.group.group,
                      background: props.data.group.colors.backgroundColor,
                      color: props.data.group.colors.textColor,
                      buttonType: "default",
                      isInstore: false, isTaxEnabled: true,
                    })
                    .then(function () { });
                });
            }
            knex("products")
              .insert({
                productKey: productKey,
                group: props.data.group.group,
                category: recipe,
                ItemName: props.data.name,
                barcode1:
                  props.data.portion.length !== 1
                    ? ""
                    : props.data.portion[0].barcode1,
                barcode2:
                  props.data.portion.length !== 1
                    ? ""
                    : props.data.portion[0].barcode2,
                barcode3:
                  props.data.portion.length !== 1
                    ? ""
                    : props.data.portion[0].barcode3,
                barcode4:
                  props.data.portion.length !== 1
                    ? ""
                    : props.data.portion[0].barcode4,
                barcode5:
                  props.data.portion.length !== 1
                    ? ""
                    : props.data.portion[0].barcode5,
                sallingprice: isMulity ? 0 : props.data.portion[0].price,
                initalPrice: isMulity ? 0 : props.data.portion[0].price,
                qnt: 1,
                multiplier: 0,
                alertOut: isMulity ? 0 : props.data.portion[0].alertOut,
                amountInstore: 0,
                sync: false,
                isInstore: false,
                isTaxEnabled: true,
                isMulity,
                department: props.from,
              })
              .then(function () {
                knex("all_products")
                  .insert({
                    productKey: productKey,
                    group: props.data.group.group,
                    category: recipe,
                    ItemName: props.data.name,
                    barcode1:
                      props.data.portion.length !== 1
                        ? ""
                        : props.data.portion[0].barcode1,
                    barcode2:
                      props.data.portion.length !== 1
                        ? ""
                        : props.data.portion[0].barcode2,
                    barcode3:
                      props.data.portion.length !== 1
                        ? ""
                        : props.data.portion[0].barcode3,
                    barcode4:
                      props.data.portion.length !== 1
                        ? ""
                        : props.data.portion[0].barcode4,
                    barcode5:
                      props.data.portion.length !== 1
                        ? ""
                        : props.data.portion[0].barcode5,
                    sallingprice: isMulity ? 0 : props.data.portion[0].price,
                    initalPrice: isMulity ? 0 : props.data.portion[0].price,
                    qnt: 1,
                    multiplier: 0,
                    alertOut: isMulity ? 0 : props.data.portion[0].alertOut,
                    amountInstore: 0,
                    sync: false,
                    isInstore: false,
                    isTaxEnabled: true,
                    isMulity,
                  })
                  .then(function () { });
                if (isMulity) {
                  props.data.portion.map((data) => {
                    console.log(props.from);

                    knex("mulitProducts")
                      .insert({
                        id: CreateId(),
                        productName: props.data.name,
                        sallingprice: parseInt(data.price),
                        initalPrice: parseInt(data.price),
                        qnt: 1,
                        barcode1: data.barcode1,
                        barcode2: data.barcode2,
                        barcode3: data.barcode3,
                        barcode4: data.barcode4,
                        barcode5: data.barcode5,
                        alertOut: parseInt(data.alertOut),
                        amountInstore: 0,
                        isInstore: false,
                        isTaxEnabled: true,
                        department: props.from,
                      })
                      .then((result) => {
                        console.log(result);
                      })
                      .catch((err) => {
                        console.log(err);
                      });


                    knex("all_mulitProducts")
                      .insert({
                        id: CreateId(),
                        productName: props.data.name,
                        sallingprice: parseInt(data.price),
                        initalPrice: parseInt(data.price),
                        qnt: 1,
                        barcode1: data.barcode1,
                        barcode2: data.barcode2,
                        barcode3: data.barcode3,
                        barcode4: data.barcode4,
                        barcode5: data.barcode5,
                        alertOut: parseInt(data.alertOut),
                        amountInstore: 0,
                        isInstore: false,
                        isTaxEnabled: true,
                      })
                      .then((result) => {
                        // console.log(result);
                      })
                      .catch((err) => {
                        // console.log(err);
                      });
                  });


                  return sendCallback({
                    from: props.from,
                    data: props.data,
                    isSet: true,
                    type: "add",
                  });
                } else {
                  return sendCallback({
                    from: props.from,
                    data: props.data,
                    isSet: true,
                    type: "add",
                  });
                }
              });
          }
        );

        break;

      case "getPOSList":
        switch (props.data.layoutType) {
          case "tabs":
            knex
              .select()
              .from("Tabs")
              .then(function (data) {
                sendCallback({
                  data,
                });
              });
            break;

          case "ProductsList":
            knex
              .select()
              .from("products")
              .where({ group: props.category })
              .then(function (data) {
                sendCallback({
                  data,
                });
              });
            break;
          case "mulitList":
            knex
              .select()
              .from("mulitProducts")
              .where({ productName: props.name })
              .then(function (data) {
                sendCallback({
                  data,
                });
              });
            break;
          case "all_P":
            var tabs = [];
            var categorylist = [];
            var productsList = [];
            var mulitList = [];

            knex
              .select()
              .from("Tabs")
              .where({ department: props.data.dep })
              .then(function (data) {
                tabs = data;

                knex
                  .select()
                  .from("products")
                  .where({ department: props.data.dep })
                  .then(function (data) {
                    productsList = data;

                    knex
                      .select()
                      .from("mulitProducts")
                      .where({ department: props.data.dep })
                      .then(function (data) {
                        mulitList = data;

                        sendCallback({
                          tabs,
                          categorylist,
                          productsList,
                          mulitList,
                        });
                      });
                  });
              });

            break;
          case "all_Products_list":
            var alltabs = [];
            var allproductsList = [];
            var allmulitList = [];

            knex
              .select()
              .from("all_Tabs")
              .then(function (data) {
                alltabs = data;

                knex
                  .select()
                  .from("all_products")
                  .then(function (data) {
                    allproductsList = data;

                    knex
                      .select()
                      .from("all_mulitProducts")
                      .then(function (data) {
                        allmulitList = data;

                        sendCallback({
                          socketId: props.socketId,
                          alltabs,
                          allproductsList,
                          allmulitList,
                        });
                      });
                  });
              });

            break;
          case "all_purcheased":
            knex
              .select()
              .where({ isInstore: true })
              .from("products")
              .then(function (data) {
                sendCallback(data);
              });

            break;
          default:
            break;
        }
        break;
      case "edit":
        // console.log(props);

        if (props.portion === 1) {
          knex("products")
            .where({ productKey: props.data.productKey })
            .update({
              ItemName: props.name,
              barcode1:
                props.portion.length === 1 ? "" : props.portion[0].barcode1,
              barcode2:
                props.portion.length === 1 ? "" : props.portion[0].barcode2,
              barcode3:
                props.portion.length === 1 ? "" : props.portion[0].barcode3,
              barcode4:
                props.portion.length === 1 ? "" : props.portion[0].barcode4,
              barcode5:
                props.portion.length === 1 ? "" : props.portion[0].barcode5,
            })
            .then(function (data) {
              return sendCallback({
                isSet: true,
                type: "update",
                data: { type: "product_update" },
              });
            });
        } else {
          knex("products")
            .where({ productKey: props.data.productKey })
            .update({
              ItemName: props.name,
            })
            .then(function (data) {
              knex
                .select()
                .from("mulitProducts")
                .where({ productName: props.name })
                .then(function (data) {
                  if (data.length === props.portion.length) {
                    // console.log(data);
                    var loopCon = false;
                    data.map((list) => {
                      props.portion.map((dataprops) => {
                        // console.log(data);
                        if (!loopCon)
                          knex("mulitProducts")
                            .where({ id: list.id })
                            .update({
                              productName: props.name,
                              barcode1: dataprops.barcode1,
                              barcode2: dataprops.barcode2,
                              barcode3: dataprops.barcode3,
                              barcode4: dataprops.barcode4,
                              barcode5: dataprops.barcode5,
                              sallingprice: dataprops.price,
                              initalPrice: dataprops.price,
                              alertOut: dataprops.alertOut,
                            })
                            .then(function () {
                              return sendCallback({
                                isSet: true,
                                type: "update",
                                data: { type: "product_update" },
                              });
                            });
                        loopCon = true;
                        return;
                      });
                      loopCon = false;
                    });
                  }
                  // sendCallback({
                  //   data,
                  // });
                });
            });
        }

        break;
      case "delete":
        knex("products")
          .where({ productKey: props.data.selected.productKey })
          .del()
          .then(function (data) {
            return sendCallback({
              isSet: true,
              data: {
                type: "delete",
                recipe: props.data.selected.category,
                group: props.data.selected.group,
                productKey: props.data.selected.ItemName,
              },
            });
          });

        break;

      case "Add_filter":
        props.data.taxMapping.map((list) => {
          knex("products")
            .where({ productKey: list.productKey })
            .andWhere({ department: props.dep })
            .update({
              isTaxEnabled: false,
            })
            .then(function (data) {
              sendCallback({
                isSet: true,
                type: "Add_filter",
              });
            });
        });

        break;

      case "remove_filter":
        props.data.taxMapping.map((list) => {
          knex("products")
            .where({ productKey: list.productKey })
            .andWhere({ department: props.dep })
            .update({
              isTaxEnabled: true,
            })
            .then(function (data) {
              sendCallback({
                isSet: true,
                type: "Add_filter",
              });
            });
        });
        break;

      case "add_to_store":
        props.data.purchaseSelected.map((nodes) => {
          knex("products")
            .where({ productKey: nodes.productKey })
            .andWhere({ department: props.dep })
            .update({
              amountInstore: nodes.quantity
                ? nodes.amountInstore + nodes.quantity
                : nodes.amountInstore + 1,
              isInstore: true,
            })
            .then(function (data) {
              knex("Tabs")
                .where({ tabname: nodes.group })
                .andWhere({ department: props.dep })
                .update({
                  isInstore: true,
                })
                .then(function (data) { });
            });
        });

        sendCallback({
          isSet: true,
        });

        break;

      case "reduce_store":
        props.data.map((list) => {
          // console.log(list);
          knex("products")
            .where({ productKey: list.productKey })
            .update({
              amountInstore: list.amountInstore,
            })
            .then(function (data) { });
        });
        break;

      case "tranfer":
        knex("inventory_transfer")
          .insert({
            name: props.data.selected.ItemName,
            quantity: props.data.value,
            date: moment().format("LLLL"),
            time: moment().format("LT"),
            from: props.data.from,
            to: props.data.to,
          })
          .then(function () {
            sendCallback({
              name: props.data.selected.ItemName,
              isSet: true,
            });
          });

        break;

      default:
        break;
    }
  },
};
