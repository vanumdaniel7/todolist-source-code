require("dotenv").config();
const cors = require("cors");
const express = require("express");
const db = require("./db/mongodb.js");
const routes = require("./routes/routes.js");
const PORT = 3000 || process.env.PORT
const app = express();

db.connect()
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/", routes);
app.listen(PORT);