const io = require("./index").io;
const {
  PRODUCT_ENTRY,
  DEVICE_DISCONNECTED,
  HANDEL_WORKPERIODS,
  USER_CONNECTED,
  GETDEPARTMENTS,
  SETDEPARTMENTS,
  GETDEPARTMENTCOFIG,
} = require("./events");
const _ = require("lodash");
const {
  _SalesReports,
  _GetDepartments,
  _SetDepartment,
  _EditDepartment,
  _UpdateUsersDepartment,
} = require("./db/queries");
const { HandelNewProducts } = require("./db/products");
require("custom-env").env();
const { StartWorkPeriod, EndWorkPeriod } = require("./actions/WorkPeriod");

require("custom-env").env();

// var count = 0;

// var $ipsConnected = [];

// io.on("connection", function (socket) {
//   var $ipAddress = socket.handshake.address;

//   if (!$ipsConnected.hasOwnProperty($ipAddress)) {
//     $ipsConnected.push(socket.id);

//     count++;
// console.log(io.engine.clients);

//     socket.emit("counter", { count: count });
//   }

//   console.log("client is connected");

//   /* Disconnect socket */

//   socket.on("disconnect", function () {
//     if ($ipsConnected.hasOwnProperty($ipAddress)) {
//       delete $ipsConnected[$ipAddress];

//       count--;

//       socket.emit("counter", { count: count });
//     }
//   });
// });

var connectedUsers = [];

module.exports = function (socket) {
  socket.on("connected", () => {
    console.log(socket.id);
  });

  socket.on("UserConnected", (props) => {
    let data = {
      data: props,
      socketId: socket.id,
    };
    var users = _.findIndex(connectedUsers, data);
    if (users === -1) {
      connectedUsers.push(data);
      io.emit("DEP_LOGGEDIN", {
        name: data.data.dep_name,
        users: connectedUsers,
      });
      // console.log(`${data.data.dep_name} has loggedIn`);
    }
  });

  socket.on("disconnect", () => {
    let data = {
      socketId: socket.id,
      _type: "remove",
    };
    connectedUsers = connectedUsers.filter((x) => x.socketId !== socket.id);
    console.log(connectedUsers);

    // connectedUsers.map((id, index) => {
    //   if (id.socketId === socket.id) {
    //     console.log(`${id.data.dep_name} has loggedOut`);
    //     connectedUsers.slice(index, 1);
    //   }
    // });
  });

  socket.on("SEND_TRANSTION", (props) => {
    connectedUsers.map((list) => {
      if (props.dep === list.data.dep_name) {
        console.log(list.socketId);
        io.to(list.socketId).emit("SEND_NOTIFICATION", props);
      }
    });
  });

  socket.on(USER_CONNECTED, (props) => {
    let data = {
      data: props,
      socketId: socket.id,
      _type: "LoggedIn",
    };
  });

  socket.on("UPDATEUSERS", (data) => {
    let Data = {
      Userdata: data,
      socketId: socket.id,
    };
    _UpdateUsersDepartment(Data, (callback) => {});
  });

  socket.on(GETDEPARTMENTS, (data) => {
    let Data = {
      Userdata: data,
      socketId: socket.id,
    };
    _GetDepartments(Data, (callback) => {
      io.to(callback.socketId).emit("DEP_RESULT", callback.data);
    });
  });

  socket.on(SETDEPARTMENTS, (data) => {
    let Data = {
      Userdata: data,
      socketId: socket.id,
    };
    _SetDepartment(Data, (callback) => {
      io.to(callback.socketId).emit("DEP_SET", callback.data);
    });
  });

  socket.on("EDITDEPARTMENTCOFIG", (data) => {
    let Data = {
      Userdata: data,
      socketId: socket.id,
    };

    _EditDepartment(Data, (callback) => {
      io.to(callback.socketId).emit("DEP_SET", callback.data);
    });
  });

  socket.on("GETALLDEPARTMENTS", (data) => {
    let Data = {
      Userdata: data,
      socketId: socket.id,
    };
  });

  socket.on("UPDATENEWPRODCT", (data) => {
    let Data = {
      Userdata: data,
      socketId: socket.id,
    };
    console.log(Data);
  });

  socket.on("UPDATEPRODCTS", (data) => {
    let Data = {
      Userdata: data,
      socketId: socket.id,
    };
    console.log(Data);
    // _putNewProudct(Data,reciveCallback=>{

    // })
  });

  socket.on("SALESREPORT", (data) => {
    let Data = {
      Userdata: data,
      socketId: socket.id,
    };

    _SalesReports(Data, (callback) => {
      io.to(callback.socketId).emit("SALESREPORTLIST", callback.productData);
    });
  });

  socket.on("UPDATENEWPROUDCT", (data) => {
    HandelNewProducts(data.data, (callback) => {});
    io.emit("UPDATEPRODUSTS", data);
  }); 

  socket.on(HANDEL_WORKPERIODS, (data) => {
    let Data = {
      Userdata: data,
      socketId: socket.id,
    };

    // WorkPeriod
    // switch (data._type) {
    //   case "start":
    //     StartWorkPeriod(Data, (callback) => {
    //       if (callback.isDone) io.to(callback.id).emit("WORKPERIOD_DONE");
    //       else io.to(callback.id).emit("WORKPERIOD_FAILED");
    //     });
    //     break;
    //   case "end":
    //     EndWorkPeriod(Data, (callback) => {
    //       console.log(callback);
    //     });
    //     break;

    //   default:
    //     break;
    // }
  });
};
