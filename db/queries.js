const knex = require("../knex"); // the connection!
const uuidv4 = require("uuid/v4");
const { HandelNewProducts } = require("./products");

function CreateId() {
  return uuidv4();
}

function _Getdata(table, type, sendCallback) {
  switch (type.state) {
    case "all":
      knex
        .select()
        .from(table)
        .then(function (data) {
          if (data.length !== 0) {
            callback({
              hasData: true,
              data,
            });
          } else {
            callback({
              hasData: false,
            });
          }
        });
      break;
    case "spec":
      knex
        .select()
        .from(table)
        .where(type.id, type.value)
        .then(function (data) {
          if (data.length !== 0) {
            sendCallback({
              hasData: true,
              data,
            });
          } else {
            sendCallback({
              hasData: false,
            });
          }
        });

    default:
      break;
  }
}

module.exports = {
  _getAllUsers(socketId, callback) {
    knex
      .select()
      .from("users")
      .then(function (user) {
        if (user.length === 0) {
          knex("users")
            .insert({
              user_id: CreateId(),
              Password: "1234",
              NotificationId: "",
            })
            .then(function () {});
        }
        callback({
          socketId: socketId,
          user,
        });
      })
      .catch((err) => {
        callback({ Error: true, msg: err });
      });
  },
  
  _getUser_ById(user_credentials, callback) {
    knex
      .select()
      .from("users")
      .where("user_id", user_credentials.user.id)
      .then(function (user) {
        if (user.length === 0) {
          callback({
            isSet: false,
            socketId: user_credentials.socketId,
            userData: { isRegistered: false, credentials: user },
          });
        } else {
          callback({
            isSet: true,
            socketId: user_credentials.socketId,
            userData: { isRegistered: true, credentials: user },
          });
        }
      });
  },

  _getUser_ByUserName(user_credentials, callback) {
    knex
      .select()
      .from("users")
      .where("email", user_credentials.user.email)
      .then(function (user) {
        if (user.length === 0) {
          callback({
            isSet: false,
            socketId: user_credentials.socketId,
            userData: { isRegistered: false, credentials: user },
          });
        } else {
          callback({
            isSet: true,
            socketId: user_credentials.socketId,
            userData: { isRegistered: true, credentials: user },
          });
        }
      });
  },

  _getAllProudcts(productData, callback) {
    knex
      .select()
      .from("products")
      .then(function (product) {
        callback({
          Error: true,
          socketId: productData.socketId,
          productData: { product },
        });
      })
      .catch((err) => {
        callback({ Error: true });
      });
  },

  _putNewProudct(data, callback) {
    // let 
    knex(data.data.pdf_type)
      .insert({
        id: data.data.pdf_id,
        name: data.data.pdf_name,
        downloads: "0",
        state: "",
        link: data.data.pdfURL,
        overview: { about: data.data.pdf_about },
        comment_status: {},
        author: data.data.userId,
        featured_image: {},
        price: data.data.pdf_price,
        secure_url: "",
        is_active: true,
      })
      .then(function () {
        knex
          .select()
          .from(data.data.pdf_type)
          .where("author", data.data.userId)
          .then(function (product) {
            callback({
              socketId: data.socketId,
              productData: { product },
            });
          });
      });
  },

  _putNewUser(user_credentials, callback) {
    knex
      .select()
      .from("users")
      .then(function (user) {
        if (user.length === 0) {
          let userId = CreateId();

          knex("users")
            .insert({
              user_id: userId,
              Password: "1234",
              NotificationId: "",
            })
            .then(function () {});
        }
      });
  },

  _SalesReports(props, sendCallback) {
    knex("sales_reports_tikets")
      .insert({
        id: props.Userdata.data.id,
        Year: props.Userdata.data.year,
        Day: props.Userdata.data.day,
        Month: props.Userdata.data.month,
        InvoiceNumber: props.Userdata.data.invoiceNumber,
        TicketList: { list: props.Userdata.data.ticketList },
        Customer: props.Userdata.data.Customer,
        GrandTotal: props.Userdata.data.GrandTotal,
        AmountPaid: props.Userdata.data.AmountPaid,
        ChangeDue: props.Userdata.data.ChangeDue,
        Balance: props.Userdata.data.Balance,
        Discount: props.Userdata.data.Discount,
        Date: props.Userdata.data.Date,
        Department: props.Userdata.data.department,
        User: props.Userdata.data.user,
        PaymentType: props.Userdata.data.paymentType,
        isTaxInvoice: props.Userdata.data.isTaxInvoice,
        Note: props.Userdata.data.note,
        totalTaxFinal: props.Userdata.data.totalTaxFinal,
        totalTax: props.Userdata.data.totalTax,
        time: props.Userdata.data.time,
      })
      .then(function () {
        knex
          .select()
          .from("sales_reports_totals")
          .where("Department", props.Userdata.data.department)
          .then(function (MainData) {
            if (MainData.length === 0) {
              knex("sales_reports_totals")
                .insert({
                  id: props.Userdata.data.id,
                  Year: props.Userdata.data.year,
                  Day: props.Userdata.data.day,
                  Month: props.Userdata.data.month,
                  SrNo: 1,
                  GrandTotal: props.Userdata.data.GrandTotal,
                  AmountPaid: props.Userdata.data.AmountPaid,
                  ChangeDue: props.Userdata.data.ChangeDue,
                  Balance: props.Userdata.data.Balance,
                  Discount: props.Userdata.data.Discount,
                  Date: props.Userdata.data.Date,
                  Department: props.Userdata.data.department,
                  totalTaxFinal: props.Userdata.data.totalTaxFinal,
                  totalTax: props.Userdata.data.totalTax,
                  time: props.Userdata.data.time,
                })
                .then(function () {});
            } else {
              knex
                .select()
                .from("sales_reports_totals")
                .where("Date", props.Userdata.data.Date)
                .then(function (data) {
                  if (data.length !== 0) {
                    // console.log(data);
                    // console.log(props.data);

                    knex("sales_reports_totals")
                      .where("Date", props.Userdata.data.Date)
                      .update({
                        GrandTotal:
                          props.Userdata.data.GrandTotal + data[0].GrandTotal,
                        AmountPaid:
                          props.Userdata.data.AmountPaid + data[0].AmountPaid,
                        ChangeDue:
                          props.Userdata.data.ChangeDue + data[0].ChangeDue,
                        Balance: props.Userdata.data.Balance + data[0].Balance,
                        Discount:
                          props.Userdata.data.Discount + data[0].Discount,
                        totalTaxFinal:
                          props.Userdata.data.totalTaxFinal +
                          parseInt(data[0].totalTaxFinal, 2),
                        totalTax:
                          props.Userdata.data.totalTax +
                          parseInt(data[0].totalTax, 2),
                      })
                      .then(function () {});
                  } else {
                    knex("sales_reports_totals")
                      .insert({
                        id: props.Userdata.data.id,
                        Year: props.Userdata.data.year,
                        Day: props.Userdata.data.day,
                        Month: props.Userdata.data.month,
                        SrNo: MainData.length + 1,
                        GrandTotal: props.Userdata.data.GrandTotal,
                        AmountPaid: props.Userdata.data.AmountPaid,
                        ChangeDue: props.Userdata.data.ChangeDue,
                        Balance: props.Userdata.data.Balance,
                        Discount: props.Userdata.data.Discount,
                        Date: props.Userdata.data.Date,
                        Department: props.Userdata.data.department,
                        totalTaxFinal: props.Userdata.data.totalTaxFinal,
                        totalTax: props.Userdata.data.totalTax,
                        time: props.Userdata.data.time,
                      })
                      .then(function () {});
                  }
                });
            }
          });
      });
  },

  _GetSalesReports(props, sendCallback) {
    console.log(props);

    knex
      .select()
      .from("sales_reports_totals")
      .where({ Department: props.Userdata.data })
      .andWhere({ [props.Userdata.dateType]: props.Userdata.date })
      .then(function (data) {
        sendCallback({
          socketId: props.socketId,
          data,
        });
      });
  },

  _GetDepartments(props, sendCallback) {
    knex
      .select()
      .from("departments_config")
      .then(function (departments) {
        if (departments.length !== 0)
          sendCallback({
            socketId: props.socketId,
            data: { exist: true, departments },
          });
        else sendCallback({ socketId: props.socketId, data: { exist: false } });
      });
  },
  _SetDepartment(props, sendCallback) {
    _Getdata(
      "departments_config",
      { state: "spec", id: "dep_name", value: props.Userdata.department },
      (callback) => {
        if (callback.hasData)
          return sendCallback({
            socketId: props.socketId,
            data: { alreadyExist: true },
          });
        else {
          knex("departments_config")
            .insert({
              id: CreateId(),
              dep_name: props.Userdata.department,
              theme: "dark",
              phone: props.Userdata.phone,
              shopNo: props.Userdata.shopNo,
              road: props.Userdata.road,
              state: props.Userdata.state,
              country: props.Userdata.country,
              tpin: props.Userdata.tpin,
              taxType: props.Userdata.taxType,
              taxRat: props.Userdata.taxRat,
              date: props.Userdata.date,
              user: props.Userdata.user,
              notifications: { notificationId: CreateId(), list: [] },
            })
            .then(function () {
              knex
                .select()
                .from("departments_config")
                .where("dep_name", props.Userdata.department)
                .then(function (departments) {
                  sendCallback({
                    socketId: props.socketId,
                    data: { alreadyExist: false, departments },
                  });
                });
            });
        }
      }
    );
  },

  _UpdateUsersDepartment(props, sendCallback) {
    knex
      .select()
      .from("departments_config")
      .where("dep_name", props.Userdata.department)
      .then(function (department) {
        // console.log(department[0].user.Users);
        var key = department[0].user.Users.length + 1;

        var temp = {
          id: props.Userdata.id,
          key: key,
          pin: props.Userdata.pin,
          userName: props.Userdata.userName,
          prevarges: props.Userdata.prevarges,
          department: props.Userdata.department,
          notifications: props.Userdata.notifications,
        };

        department[0].user.Users.push(temp);

        knex("departments_config")
          .where("dep_name", props.Userdata.department)
          .update({
            user: { Users: department[0].user.Users },
          })
          .then(function () {
            knex
              .select()
              .from("departments_config")
              .then(function (departments) {
                sendCallback({
                  socketId: props.socketId,
                  data: { exist: true, departments },
                });
              });
          });
      });
  },

  _EditDepartment(props, sendCallback) {
    knex("departments_config")
      .where("id", props.Userdata.id)
      .update({
        dep_name: props.Userdata.dep_name,
        phone: props.Userdata.phone,
        shopNo: props.Userdata.shopNo,
        road: props.Userdata.road,
        tpin: props.Userdata.tpin,
        taxType: props.Userdata.taxType,
        taxRat: props.Userdata.taxRat,
      })
      .then(function () {
        knex
          .select()
          .from("departments_config")
          .then(function (departments) {
            sendCallback({
              socketId: props.socketId,
              data: { exist: true, departments },
            });
          });
      });
  },

  _GetBackUp(props, sendCallback) {
    HandelNewProducts(props, (callback) => {
      sendCallback({
        socketId: props.socketId,
        data: callback,
      });
    });
  },
};
