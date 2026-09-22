const express = require("express");
const booksRouter = require("./routes/books");

const app = express();
app.use(express.json());
app.use("/api/books", booksRouter);
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Server is working");
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
