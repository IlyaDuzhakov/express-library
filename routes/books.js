const express = require("express");
const upload = require("../middleware/file");
const router = express.Router();

const books = [];
let nextId = 1;

router.get("/", (req, res) => {
  res.json(books);
});

router.post("/", upload.single("fileBook"), (req, res) => {
  const newBook = {
    id: String(nextId),
    ...req.body,
    favorite: req.body.favorite === "true",
    fileBook: req.file ? req.file.path : "",
  };

  books.push(newBook);
  nextId++;
  res.json(newBook);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find((book) => {
    return book.id === id;
  });
  if (book === undefined) {
    res.status(404).json(`Book not found`);
  } else {
    res.json(book);
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;

  const book = books.find((book) => {
    return book.id === id;
  });

  if (book === undefined) {
    res.status(404).json("Book not found");
  } else {
    Object.assign(book, req.body);

    res.json(book);
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const bookIndex = books.findIndex((book) => {
    return book.id === id;
  });

  if (bookIndex === -1) {
    res.status(404).json("Book not found");
  } else {
    books.splice(bookIndex, 1);
    res.send("ok");
  }
});

router.get("/:id/download", (req, res) => {
  const id = req.params.id;

  const book = books.find((book) => {
    return book.id === id;
  });

  if (book === undefined) {
    res.status(404).json("Book not found");
  } else {
    res.download(book.fileBook);
  }
});

module.exports = router;
