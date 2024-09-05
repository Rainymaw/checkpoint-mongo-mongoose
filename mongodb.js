const mongoose = require("mongoose");
const uri =
  "mongodb+srv://user:user@bookstore-database.plwzqq6.mongodb.net/?retryWrites=true&w=majority&appName=bookstore-database";

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    mongoose
      .connect(uri, { dbName: "book_api" })
      .then((client) => {
        dbConnection = mongoose.connection;
        return cb();
      })
      .catch((err) => {
        console.log("Connection error : ", err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
