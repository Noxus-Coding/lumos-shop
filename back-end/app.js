require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routers/authRoutes.js");
const productRoutes = require("./src/routers/productRoutes.js");
const categoryRoutes = require("./src/routers/categoryRoutes.js");
const orderRoutes = require("./src/routers/orderRoutes.js");
const dashboardRoutes = require("./src/routers/dashboardRoutes.js");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());


app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);
app.use("/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});