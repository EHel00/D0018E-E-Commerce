const express = require("express");
const cors = require("cors");
const logger = require("./utility/logger");

const dotenv = require("dotenv").config();

const app = express();

const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors({ 
   
    credentials: true,
     origin :[
            'http://localhost:8080',
            'http://127.0.0.1:8080',
            'http://localhost:5173',
            'http://13.60.197.58:8080'
            ] 
            // 'http://localhost:5173',
            // 'http://127.0.0.1:8080',
            // 'http://13.53.62.51:8080',
    }));

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});