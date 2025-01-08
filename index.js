const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const userRoutes = require("./routes/users");

let url =
  "mongodb+srv://shakhzodeshimboyev:gXv5J6hfkw95U6ro@cluster0.akorq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.use(categoriesRoutes);
app.use(productsRoutes);
app.use(registerRoutes);
app.use(loginRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
