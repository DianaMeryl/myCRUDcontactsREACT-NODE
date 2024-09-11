const express = require("express");
const sequelize = require("./database/database");
const contactsRoutes = require("./routes/contactsRoute");
const cors = require("cors");

const PORT = 3000;

const app = express();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Таблиця Contacts успішно створена (якщо ще не існує).");
  })
  .catch((error) => {
    console.error("Помилка при створенні таблиці:", error);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(contactsRoutes);

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
