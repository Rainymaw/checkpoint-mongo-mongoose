const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  année: {
    type: Number,
  },

  prix: {
    type: Number,
    default: 9.99,
  },
  cover: {
    type: String,
    default: "default.jpg",
  },
});

const Book = mongoose.model("Book", schema, (collection = "books"));

module.exports = { Book };
