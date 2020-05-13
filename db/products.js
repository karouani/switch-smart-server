// import { getDatafilePath } from "../../dataBase/store/path";
// import appDb from "../../dataBase";

const path = require("path");
const moment = require("moment");
const uuidv4 = require("uuid/v4");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

// let defaultPath = getDatafilePath;
// const ConfigPath = defaultPath + "/dataFiles/Products/config.json";
// const FolderPath = defaultPath + "/dataFiles/Products/";

var ConfigPath = path.join(__dirname, "config.json");

const ConfigAdapter = new FileAsync("products.json");
function CreateId() {
  return uuidv4();
}

var check = moment(new Date());
var day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
var month = check.format("MMMM"); // => ('January','February.....)
var year = check.format("YYYY");
var time = check.format("LT");

module.exports = {
  HandelNewProducts(props, sendCallback) {
    var isMulity = false;
    var multi = [];

    switch (props._type) {
      case "set":
        // if (fs.existsSync(ConfigPath))
        low(ConfigAdapter).then((tempdb) => {
          const isWriten = tempdb.get("Products").value();
          // Set valueables

          var recipe = props.recipe === "" ? props.group.group : props.recipe;
          var index = 0;

          var Productsloop = 0;
          var ProductsLength = isWriten ? isWriten.length : 0;
          var ProductsLoopLeft = 0;

          var categoryloop = 0;
          var categoryLength = 0;
          var categoryLoopLeft = 0;

          if (isWriten) index = isWriten.length;
          // set mulity
          if (props.portion.length !== 1) {
            isMulity = true;
            props.portion.map((data) => {
              var tempCategory = {
                barcode: data.barcode,
                sallingprice: data.price,
                initalPrice: data.price,
                qnt: 1,
                multiplier: data.multiplier,
                alertOut: data.alertOut,
                amountInstore: 0,
                isInstore: false,
              };
              multi.push(tempCategory);
            });
          }

          // inital Data
          var initalData = {
            tabname: props.group.group,
            background: props.group.colors.backgroundColor,
            color: props.group.colors.textColor,
            index,
            id: CreateId(),
            category: [
              {
                categoryKey: index,
                cartname: recipe,
                subcart: [
                  {
                    productKey: CreateId(),
                    ItemName: props.name,
                    barcode: isMulity ? 0 : props.portion[0].barcode,
                    sallingprice: isMulity ? 0 : props.portion[0].price,
                    initalPrice: isMulity ? 0 : props.portion[0].price,
                    qnt: 1,
                    multiplier: isMulity ? 0 : props.portion[0].multiplier,
                    alertOut: isMulity ? 0 : props.portion[0].alertOut,
                    amountInstore: 0,
                    isInstore: false,
                    isTaxEnabled: true,
                    isMulity,
                    multi,
                  },
                ],
              },
            ],
          };
          // check if not writen

          if (!isWriten)
            tempdb
              .defaults({ Products: [initalData] })
              .write()
              .then(() => {
                return sendCallback({
                  isSet: true,
                  type: "add",
                  data: {
                    type: "product",
                    tabname: props.group.group,
                    background: props.group.colors.backgroundColor,
                    color: props.group.colors.textColor,
                    cartname: recipe,
                    ItemName: props.name,
                    barcode: isMulity ? 0 : props.portion[0].barcode,
                    sallingprice: isMulity ? 0 : props.portion[0].price,
                    initalPrice: isMulity ? 0 : props.portion[0].price,
                    qnt: 1,
                    multiplier: isMulity ? 0 : props.portion[0].multiplier,
                    alertOut: isMulity ? 0 : props.portion[0].alertOut,
                    amountInstore: 0,
                    isInstore: false,
                    isTaxEnabled: true,
                    isMulity,
                    multi,
                  },
                });
              });

          // else if is writen

          var groupList = tempdb
            .get("Products")
            .find({ tabname: props.group.group })
            .value();

          if (groupList) {
            var cartnameList = tempdb
              .get("Products")
              .find({ category: [{ cartname: props.recipe }] })
              .value();

            if (cartnameList) {
              var initalMulit = {
                productKey: CreateId(),
                ItemName: props.name,
                barcode: isMulity ? 0 : props.portion[0].barcode,
                sallingprice: isMulity ? 0 : props.portion[0].price,
                initalPrice: isMulity ? 0 : props.portion[0].price,
                qnt: 1,
                multiplier: isMulity ? 0 : props.portion[0].multiplier,
                alertOut: isMulity ? 0 : props.portion[0].alertOut,
                amountInstore: 0,
                isInstore: false,
                isTaxEnabled: true,
                isMulity,
                multi,
              };

              cartnameList.category.map((cartList, cartIndex) => {
                if (cartList.cartname === props.recipe) {
                  cartList.subcart.push(initalMulit);

                  tempdb
                    .get("Products")
                    .find({ id: cartnameList.id })
                    .assign({ category: cartnameList.category })
                    .value();
                  tempdb.write().then(() => {
                    return sendCallback({
                      isSet: true,
                      type: "add",
                      data: {
                        type: "product",
                        tabname: props.group.group,
                        background: props.group.colors.backgroundColor,
                        color: props.group.colors.textColor,
                        cartname: recipe,
                        ItemName: props.name,
                        barcode: isMulity ? 0 : props.portion[0].barcode,
                        sallingprice: isMulity ? 0 : props.portion[0].price,
                        initalPrice: isMulity ? 0 : props.portion[0].price,
                        qnt: 1,
                        multiplier: isMulity ? 0 : props.portion[0].multiplier,
                        alertOut: isMulity ? 0 : props.portion[0].alertOut,
                        amountInstore: 0,
                        isInstore: false,
                        isTaxEnabled: true,
                        isMulity,
                        multi,
                      },
                    });
                  });
                  return;
                }
              });
            } else {
              var initalCategory = {
                categoryKey: index,
                cartname: recipe,
                subcart: [
                  {
                    ItemName: props.name,
                    productKey: CreateId(),
                    barcode: isMulity ? 0 : props.portion[0].barcode,
                    sallingprice: isMulity ? 0 : props.portion[0].price,
                    initalPrice: isMulity ? 0 : props.portion[0].price,
                    qnt: 1,
                    multiplier: isMulity ? 0 : props.portion[0].multiplier,
                    alertOut: isMulity ? 0 : props.portion[0].alertOut,
                    amountInstore: 0,
                    isInstore: false,
                    isTaxEnabled: true,
                    isMulity,
                    multi,
                  },
                ],
              };

              cartnameList.category.push(initalCategory);
              tempdb
                .get("Products")
                .find({ id: cartnameList.id })
                .assign({ category: cartnameList.category })
                .value();
              tempdb.write().then(() => {
                return sendCallback({
                  isSet: true,
                  type: "add",
                  data: {
                    type: "product",
                    tabname: props.group.group,
                    background: props.group.colors.backgroundColor,
                    color: props.group.colors.textColor,
                    cartname: recipe,
                    ItemName: props.name,
                    barcode: isMulity ? 0 : props.portion[0].barcode,
                    sallingprice: isMulity ? 0 : props.portion[0].price,
                    initalPrice: isMulity ? 0 : props.portion[0].price,
                    qnt: 1,
                    multiplier: isMulity ? 0 : props.portion[0].multiplier,
                    alertOut: isMulity ? 0 : props.portion[0].alertOut,
                    amountInstore: 0,
                    isInstore: false,
                    isTaxEnabled: true,
                    isMulity,
                    multi,
                  },
                });
              });
            }

            return;
          } else {
            // console.log(ProductsLoopLeft);
            tempdb
              .get("Products")
              .push(initalData)
              .write()
              .then(() => {
                sendCallback({
                  isSet: true,
                  type: "add",
                  data: {
                    type: "product",
                    tabname: props.group.group,
                    background: props.group.colors.backgroundColor,
                    color: props.group.colors.textColor,
                    cartname: recipe,
                    ItemName: props.name,
                    barcode: isMulity ? 0 : props.portion[0].barcode,
                    sallingprice: isMulity ? 0 : props.portion[0].price,
                    initalPrice: isMulity ? 0 : props.portion[0].price,
                    qnt: 1,
                    multiplier: isMulity ? 0 : props.portion[0].multiplier,
                    alertOut: isMulity ? 0 : props.portion[0].alertOut,
                    amountInstore: 0,
                    isInstore: false,
                    isTaxEnabled: true,
                    isMulity,
                    multi,
                  },
                });
              });
          }
        });
        break;

      case "get":
        low(ConfigAdapter).then((tempdb) => {
          const data = tempdb.get("Products").value();
          if (data) {
            sendCallback(data);
          } else {
            sendCallback([]);
          }
        });
        break;
      case "edit":
        // console.log(props);
        low(ConfigAdapter).then((tempdb) => {
          const data = tempdb.get("Products").value();
          data.map((datalist) => {
            if (datalist.tabname === props.data.group) {
              datalist.category.map((cartlist, cart_index) => {
                if (cartlist.cartname === props.data.recipes) {
                  // var newCart = [];
                  cartlist.subcart.map((productlist, index) => {
                    if (productlist.productKey === props.data.productKey) {
                      var tempGroup = "";
                      var tempRecipe = "";

                      if (props.group.group === "") {
                        tempGroup = props.data.group;
                      } else if (props.group.group === props.data.group) {
                        tempGroup = props.data.group;
                      }
                      if (props.recipe === "") {
                        tempRecipe = props.data.recipes;
                      } else if (props.recipe === props.data.recipes) {
                        tempRecipe = props.data.recipes;
                      }
                      // Multi Price
                      if (props.portion.length !== 1) {
                        isMulity = true;
                        props.portion.map((data) => {
                          var tempCategory = {
                            productKey: CreateId(),
                            barcode: data.barcode,
                            sallingprice: data.price,
                            initalPrice: data.price,
                            qnt: 1,
                            multiplier: data.multiplier,
                            alertOut: data.alertOut,
                            amountInstore: 0,
                            isInstore: false,
                          };
                          multi.push(tempCategory);
                        });
                      }

                      // inital Data
                      var initalData = {
                        ItemName: props.name,
                        productKey: productlist.productKey,
                        barcode: isMulity ? 0 : props.portion[0].barcode,
                        sallingprice: isMulity ? 0 : props.portion[0].price,
                        initalPrice: isMulity ? 0 : props.portion[0].price,
                        qnt: 1,
                        multiplier: isMulity ? 0 : props.portion[0].multiplier,
                        alertOut: isMulity ? 0 : props.portion[0].alertOut,
                        amountInstore: productlist.amountInstore,
                        isInstore: productlist.isInstore,
                        isTaxEnabled: productlist.isTaxEnabled,
                        isMulity,
                        multi,
                      };

                      if (tempGroup !== props.data.group) {
                        alert(
                          `Do you want move this product from ${props.data.group} to ${props.group.group}`
                        );
                      } else if (tempRecipe !== props.data.recipes) {
                        alert(
                          `Do you want move this product from ${props.data.recipes} to ${props.recipe}`
                        );
                      } else {
                        var cartname = cartlist.cartname;
                        var categoryKey = cartlist.categoryKey;

                        cartlist.subcart[index] = initalData;
                        datalist.category[cart_index] = {
                          categoryKey,
                          cartname,
                          subcart: cartlist.subcart,
                        };
                        tempdb
                          .get("Products")
                          .find({ id: datalist.id })
                          .assign({ category: datalist.category })
                          .value();
                        tempdb.write().then(() => {
                          return sendCallback({
                            isSet: true,
                            type: "update",
                            data: { type: "product_update" },
                          });
                        });
                        // console.log(datalist);
                      }
                    } else {
                    }
                  });
                }
              });
            }
          });
        });

      case "delete":
        low(ConfigAdapter).then((tempdb) => {
          const data = tempdb.get("Products").value();
          data.map((datalist) => {
            if (datalist.tabname === props.selected.group) {
              datalist.category.map((cartlist, cart_index) => {
                if (cartlist.cartname === props.selected.recipes) {
                  var newCart = [];
                  cartlist.subcart.map((productlist, index) => {
                    if (productlist.productKey === props.selected.productKey) {
                      var name = productlist.ItemName;
                      newCart = cartlist.subcart;
                      const index = newCart.findIndex(
                        (x) => x.productKey === props.selected.productKey
                      );
                      newCart.splice(index, 1);

                      var cartname = cartlist.cartname;
                      var categoryKey = cartlist.categoryKey;

                      cartlist.subcart = newCart;
                      datalist.category[cart_index] = {
                        categoryKey,
                        cartname,
                        subcart: cartlist.subcart,
                      };

                      tempdb
                        .get("Products")
                        .find({ id: datalist.id })
                        .assign({ category: datalist.category })
                        .value();
                      tempdb.write().then(() => {
                        return sendCallback({
                          isSet: true,
                          name,
                          data: {
                            type: "delete",
                            recipe: cartname,
                            group: datalist.tabname,
                            productKey: productlist.productKey,
                          },
                        });
                      });
                      // console.log(datalist.category);
                    }
                  });
                }
              });
            }
          });
        });
        break;
      case "getRecipe":
        low(ConfigAdapter).then((tempdb) => {
          const data = tempdb.get("Products").value();
          data.map((dataList) => {
            if (dataList.tabname === props.taxMapping.data[props.index].group) {
              dataList.category.map((cartlist) => {
                if (
                  cartlist.cartname ===
                  props.taxMapping.data[props.index].recipes
                ) {
                  sendCallback({ isSet: true, cartlist });
                }
              });
            }
          });
        });
        // console.log();
        break;

      case "Add_filter":
        var GroupLooplength = 0;
        var GroupLoopPos = 0;
        var GroupLoopCounter = 0;

        var category = [];

        props.data.taxMapping.data.map((mainList) => {
          switch (mainList.add_all_group) {
            case true:
              low(ConfigAdapter).then((tempdb) => {
                const data = tempdb.get("Products").value();
                data.map((dataList) => {
                  if (dataList.tabname === mainList.group) {
                    GroupLooplength = dataList.category.length;

                    dataList.category.map((cartlist) => {
                      GroupLoopCounter++;
                      var tempArr = [];

                      cartlist.subcart.map((list) => {
                        list.isTaxEnabled = false;
                        tempArr.push(list);
                      });
                      category.push({
                        categoryKey: cartlist.categoryKey,
                        cartname: cartlist.cartname,
                        subcart: tempArr,
                      });
                      if (GroupLoopPos === 1 || GroupLooplength === 1) {
                        tempdb
                          .get("Products")
                          .find({ id: dataList.id })
                          .assign({ category: category })
                          .value();
                        tempdb.write().then(() => {
                          console.log(dataList);
                          return sendCallback({
                            isSet: true,
                            name: mainList.group,
                          });
                        });
                      }
                      GroupLoopPos = GroupLooplength - GroupLoopCounter;
                    });
                  }
                });
              });
              break;
            case false:
              low(ConfigAdapter).then((tempdb) => {
                const data = tempdb.get("Products").value();
                data.map((dataList) => {
                  if (dataList.tabname === mainList.group) {
                    GroupLooplength = dataList.category.length;

                    dataList.category.map((cartlist, mainIndex) => {
                      GroupLoopCounter++;
                      if (cartlist.cartname === mainList.recipes) {
                        if (mainList.add_all_recipes) {
                          var tempArr = [];

                          cartlist.subcart.map((list) => {
                            list.isTaxEnabled = false;
                            tempArr.push(list);
                          });
                          cartlist.subcart = tempArr;
                          dataList.category[mainIndex].subcart =
                            cartlist.subcart;

                          tempdb
                            .get("Products")
                            .find({ id: dataList.id })
                            .assign({ category: dataList.category })
                            .value();
                          tempdb.write().then(() => {
                            return sendCallback({
                              isSet: true,
                              name: mainList.recipes,
                            });
                          });
                        } else {
                          cartlist.subcart.map((list, index) => {
                            if (list.ItemName === mainList.product) {
                              cartlist.subcart[index].isTaxEnabled = false;

                              dataList.category[mainIndex].subcart =
                                cartlist.subcart;

                              tempdb
                                .get("Products")
                                .find({ id: dataList.id })
                                .assign({ category: dataList.category })
                                .value();
                              tempdb.write().then(() => {
                                return sendCallback({
                                  isSet: true,
                                  name: mainList.product,
                                });
                              });
                            }
                          });
                        }
                      }
                    });
                  }
                });
              });
              break;

            default:
              break;
          }
        });
        break;
      case "remove_filter":
        console.log(props.data);
        low(ConfigAdapter).then((tempdb) => {
          const data = tempdb.get("Products").value();
          data.map((dataList) => {
            if (dataList.tabname === props.data.data.mainNode) {
              GroupLooplength = dataList.category.length;

              dataList.category.map((cartlist, mainIndex) => {
                GroupLoopCounter++;
                if (cartlist.cartname === props.data.data.subNodeName) {
                  cartlist.subcart.map((list, index) => {
                    if (list.ItemName === props.data.ItemName) {
                      cartlist.subcart[index].isTaxEnabled = true;

                      dataList.category[mainIndex].subcart = cartlist.subcart;

                      tempdb
                        .get("Products")
                        .find({ id: dataList.id })
                        .assign({ category: dataList.category })
                        .value();
                      tempdb.write().then(() => {
                        return sendCallback({
                          isSet: true,
                          name: props.data.ItemName,
                        });
                      });
                    }
                  });
                }
              });
            }
          });
        });
        break;

      case "remove_from_store":
        // console.log(props);

        low(ConfigAdapter).then((tempdb) => {
          const data = tempdb.get("Products").value();
          data.map((dataList) => {
            if (dataList.tabname === props.oldData.group) {
              // console.log(props.data.mainNode);
              GroupLooplength = dataList.category.length;

              dataList.category.map((cartlist, mainIndex) => {
                GroupLoopCounter++;
                if (cartlist.cartname === props.oldData.recipes) {
                  cartlist.subcart.map((list, index) => {
                    if (list.ItemName === props.oldData.name) {
                      cartlist.subcart[index].isInstore = false;
                      cartlist.subcart[index].amountInstore = 0;

                      dataList.category[mainIndex].subcart = cartlist.subcart;

                      tempdb
                        .get("Products")
                        .find({ id: dataList.id })
                        .assign({ category: dataList.category })
                        .value();
                      tempdb.write().then(() => {
                        return sendCallback({
                          isSet: true,
                          name: props.oldData.name,
                          data: {
                            type: "remove_from_store",
                            name: props.oldData.name,
                            recipe: props.oldData.recipes,
                            group: props.oldData.group,
                          },
                        });
                      });
                    }
                  });
                }
              });
            }
          });
        });

        break;

      case "add_to_store":
        var isSent = false;

        low(ConfigAdapter).then((tempdb) => {
          const data = tempdb.get("Products").value();
          data.map((dataList) => {
            props.purchaseSelected.map((nodes) => {
              if (dataList.tabname === nodes.group) {
                // console.log(props.data.mainNode);
                GroupLooplength = dataList.category.length;

                dataList.category.map((cartlist, mainIndex) => {
                  GroupLoopCounter++;
                  if (cartlist.cartname === nodes.recipes) {
                    cartlist.subcart.map((list, index) => {
                      if (list.ItemName === nodes.name) {
                        if (cartlist.subcart[index].isInstore) {
                          cartlist.subcart[index].amountInstore = nodes.quantity
                            ? cartlist.subcart[index].amountInstore +
                              nodes.quantity
                            : cartlist.subcart[index].amountInstore + 1;
                        } else {
                          cartlist.subcart[index].amountInstore = nodes.quantity
                            ? nodes.quantity
                            : 1;
                          cartlist.subcart[index].isInstore = true;
                        }

                        dataList.category[mainIndex].subcart = cartlist.subcart;

                        tempdb
                          .get("Products")
                          .find({ id: dataList.id })
                          .assign({ category: dataList.category })
                          .value();
                        tempdb.write().then(() => {
                          if (!isSent) {
                            isSent = true;
                            //   appDb.HandelReports(
                            //     {
                            //       _type: "purchases",
                            //       purchasedList: props.purchaseSelected,
                            //     },
                            //     (recivedCallback) => {}
                            //   );
                            return sendCallback({
                              isSet: true,
                              data: {
                                type: "add_to_store",
                                group: dataList.tabname,
                                recipes: cartlist.cartname,
                                list,
                                name: list.ItemName,
                                number: props.purchaseSelected.length,
                              },
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          });
        });

        break;

      case "tranfer":
        // console.log(props);

        low(ConfigAdapter).then((tempdb) => {
          console.log(props);

          const data = tempdb.get("Products").value();
          data.map((dataList) => {
            if (dataList.tabname === props.selected.group) {
              GroupLooplength = dataList.category.length;

              dataList.category.map((cartlist, mainIndex) => {
                GroupLoopCounter++;
                if (cartlist.cartname === props.selected.recipes) {
                  cartlist.subcart.map((list, index) => {
                    if (list.ItemName === props.selected.name) {
                      if (props.state === "sent") {
                        cartlist.subcart[index].amountInstore =
                          cartlist.subcart[index].amountInstore -
                          parseInt(props.value);

                        dataList.category[mainIndex].subcart = cartlist.subcart;

                        tempdb
                          .get("Products")
                          .find({ id: dataList.id })
                          .assign({ category: dataList.category })
                          .value();
                        tempdb.write().then(() => {
                          dbhook("inventory_transfer")
                            .insert({
                              name: props.selected.name,
                              quantity: props.value,
                              date: moment().format("ddd MMM Do, YYYY"),
                              time: time,
                              state: props.state,
                              isCleared: props.isCleared,
                              department: props.dep,
                            })
                            .then(function () {
                              dbhook
                                .select()
                                .from("inventory_transfer")
                                .then(function (department) {
                                  // console.log(department);
                                  sendCallback({
                                    isSet: "SEND_TRANSTION",
                                    props,
                                  });
                                });
                            });
                        });
                      } else {
                        cartlist.subcart[index].amountInstore =
                          cartlist.subcart[index].amountInstore +
                          parseInt(props.value);

                        dataList.category[mainIndex].subcart = cartlist.subcart;

                        tempdb
                          .get("Products")
                          .find({ id: dataList.id })
                          .assign({ category: dataList.category })
                          .value();
                        tempdb.write().then(() => {
                          dbhook("inventory_transfer")
                            .insert({
                              name: props.selected.name,
                              quantity: props.value,
                              date: moment().format("ddd MMM Do, YYYY"),
                              time: time,
                              state: props.state,
                              isCleared: props.isCleared,
                              department: props.dep,
                            })
                            .then(function () {
                              dbhook
                                .select()
                                .from("inventory_transfer")
                                .then(function (department) {
                                  // console.log(department);
                                  sendCallback({
                                    isSet: "SEND_TRANSTION",
                                    props,
                                  });
                                });
                            });
                        });
                      }
                    }
                  });
                }
              });
            }
          });
        });

      default:
        break;
    }
  },
};
