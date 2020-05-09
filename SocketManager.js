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
const { _SalesReports,_GetDepartments,_SetDepartment } = require("./db/queries");
require("custom-env").env();
const { StartWorkPeriod, EndWorkPeriod } = require("./actions/WorkPeriod");

require("custom-env").env();

module.exports = function (socket) {
  socket.on("connected", () => {
    console.log(socket.id);
  });

  socket.on("UserConnected", (userId) => {
    console.log(userId);
  });

  socket.on("disconnect", () => {
    let data = {
      socketId: socket.id,
      _type: "remove",
    };
  });

  socket.on("DEP_CONNECTED", (props) => {
    let data = {
      data: props,
      socketId: socket.id,
      _type: "set",
    };
  });

  socket.on(USER_CONNECTED, (props) => {
    let data = {
      data: props,
      socketId: socket.id,
      _type: "LoggedIn",
    };
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

  socket.on(GETDEPARTMENTCOFIG, (data) => {
    let Data = {
      Userdata: data,
      socketId: socket.id,
    };
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
