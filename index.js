const express = require("express");
const upload = require("./middleware/file");
const {
  router: booksRouter,
  books,
  createBook,
} = require("./routes/books");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/books", booksRouter);

const PORT = 3000;

app.get("/", (req, res) => {
  res.render("index", { books });
});

app.get("/books", (req, res) => {
  res.render("index", { books });
});

app.get("/books/create", (req, res) => {
  res.render("create");
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;

  const book = books.find((book) => {
    return book.id === id;
  });

  if (book === undefined) {
    return res.status(404).send("Book not found");
  }

  res.render("view", { book });
});

app.get("/books/:id/update", (req, res) => {
  const id = req.params.id;

  const book = books.find((book) => {
    return book.id === id;
  });

  if (book === undefined) {
    return res.status(404).send("Book not found");
  }

  res.render("update", { book });
});

app.post("/books/create", upload.single("fileBook"), (req, res) => {
  createBook(
    req.body,
    req.file ? req.file.path : ""
  );

  res.redirect("/books");
});

app.post("/api/user/login", (req, res) => {
  res.status(201).json({
    id: 1,
    mail: "test@mail.ru",
  });
});

app.post("/books/:id/update", (req, res) => {
  const id = req.params.id;

  const book = books.find((book) => {
    return book.id === id;
  });

  if (book === undefined) {
    return res.status(404).send("Book not found");
  }

  book.title = req.body.title;
  book.author = req.body.author;
  book.favorite = req.body.favorite === "true";

  res.redirect(`/books/${id}`);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
