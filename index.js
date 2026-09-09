const express = require("express");

const app = express();
app.use(express.json());
const PORT = 3000;

const books = [];
let nextId = 1;
app.get("/", (req, res) => {
  res.send("Server is working");
});

app.post("/api/books", (req, res) => {
    
  const newBook = {
    id: String(nextId),
    ... req.body
  };

  books.push(newBook);
  nextId++;
  res.json(newBook);
});

app.get('/api/books', (req, res) => {
    res.json(books)
})

app.get("/api/books/:id", (req, res) => {

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

app.put("/api/books/:id", (req, res) => {
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

app.delete("/api/books/:id", (req, res) => {
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

app.post("/api/user/login", (req, res) => {
  res.status(201).json({
    id: 1,
    mail: "test@mail.ru",
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
