require('dotenv').config()
const express = require("express");
const ConnectDb = require("./Db");
const cors = require("cors")
const app = express();
const UserRoute = require("./Routes/UserRoute");
const swaggerDoc = require("./swaggerdoc.json");
const swaggerUi = require('swagger-ui-express')

ConnectDb();
app.use(cors())
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/users', UserRoute);  

app.listen(8080, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
