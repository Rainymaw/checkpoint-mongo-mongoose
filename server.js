const express = require("express");
const PORT = 8030;
const app = express();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { Book } = require("./model/Book");
const cors = require("cors");
app.use(cors());
app.use(express.json({ urlencoded: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");

//Route /books
const { connectToDb, getDb } = require("./mongodb");
//connection à la base de données
let books = "";
connectToDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log("Listening on port : ", PORT);
    });
  }
  database = getDb();
});

const path = require("path");
app.use("/books", express.static(path.join(__dirname, "images")));
app.get("/books", (req, res) => {
  //Envoyer la page books.ejs
  //Comment récupérer les livres :

  Book.find().then((books) => {
    res.render("books", { books: books });
  });
});
//Route /books/id
//Supprimer un livre
const { ObjectId } = require("mongodb");
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  Book.findOneAndDelete(id).then((result) => {
    if (result) {
      console.log("Success");
    }
  });
});
//Route /books/new
app.get("/newbook", (req, res) => {
  //Envoyer la page newbook.ejs
  res.render("newbook");
});
app.post("/newbook", upload.single("cover"), (req, res) => {
  const cover = req.file.filename;

  const { title, year, price, description } = req.body;
  const newid = uuidv4();
  //créer un nouveau livre
  const newBook = new Book({
    titre: title,
    description: description,
    année: year,
    prix: price,
    cover: cover,
  });
  newBook.save().then((book) => {
    console.log("New book created");
  });

  res.redirect("/books");
});

//route pour modifier un livre
app.get(
  "/editbook/:id",
  express.static(path.join(__dirname, "images")),
  (req, res) => {
    const { id } = req.params;
    Book.findById(id).then((book) => {
      res.render("editbook", { book: book });
    });
  }
);
app.put("/editbook/:id", upload.single("cover"), (req, res) => {
  const { id } = req.params;
  const { title, description, price, year, covername } = req.body;

  Book.findByIdAndUpdate(id, {
    titre: title,
    description: description,
    prix: price,
    année: year,
    cover: covername,
  }).then((result) => {
    res.json({ message: "The book has been updated", result });
  });
});
