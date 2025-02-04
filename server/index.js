const express = require("express");
const cors = require("cors");


const dotenv = require("dotenv").config();

const app = express();

const port = process.env.SERVER_PORT;

app.use(express.json());

app.use(cors({ origin :'*'}));

app.use("/api/user", require("./routes/userRoutes"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});