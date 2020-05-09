const knex = require("../knex"); // the connection!
const uuidv4 = require("uuid/v4");

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
      .then(function (users) {
        callback({
          Error: false,
          socketId: socketId, 
          Users: { users },
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
    // let productId = CreateId();

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
      .where("email", user_credentials.email)
      .then(function (user) {
        if (user.length === 0) {
          let userId = CreateId();

          knex("users")
            .insert({
              user_id: user_credentials.id ? user_credentials.id : userId,
              user_name: user_credentials.name,
              email: user_credentials.email,
              Fname: user_credentials.name,
              Lname: user_credentials.lname,
              Password: user_credentials.password,
              Profile_pic: user_credentials.withImg ? user_credentials.img : {},
              Purchases: {},
              NotificationId: user_credentials.notificationId,
            })
            .then(function () {
              knex
                .select()
                .from("users")
                .where(
                  "user_id",
                  user_credentials.id ? user_credentials.id : userId
                )
                .then(function (user) {
                  callback({
                    socketId: user_credentials.socketId,
                    userData: { isRegistered: true, credentials: user },
                    exists: false,
                  });
                });
            });
        } else {
          callback({
            socketId: user_credentials.socketId,
            userData: {},
            exists: true,
          });
        }
      });
  },

  _SalesReports(props, sendCallback) {
    knex("sales")
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
          .from("sales")
          .where("Department", props.Userdata.data.department)
          .then(function (product) {
            console.log(product);
            
            sendCallback({
              socketId: props.socketId,
              productData: { product },
            });
          });
      }); 
  },
  _GetDepartments(props, sendCallback) {
    
    knex
      .select()
      .from("departments_config")
      .then(function (departments) { 
        console.log(departments);
        
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
              theme: "light",
              phone: "",
              shopNo: "",
              road: "",
              state: "",
              country: "",
              tpin: "",
              taxType: "VAT",
              taxRat: 16,
              association: "",
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
};
