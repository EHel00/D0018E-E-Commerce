const express = require("express");
const cors = require("cors");
const logger = require("./utility/logger");

const dotenv = require("dotenv").config();

const app = express();

const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors({ 
   
    credentials: true,
    origin :['http://localhost:5173',
            'http://127.0.0.1:8080',
            'http://localhost:8080'] // allow requests to server from port 5174
    }));

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});