import "dotenv/config";
import express from "express";
const cors = require("cors");

// const bodyParser = require("body-parser");
import sequelize from "./config/database";
import applyMiddlewares from "./middlewares";
import router from "./routes";
// new
//new

const jwt = require("jsonwebtoken");

const app = express();

// const JWT_SECRET = "your_jwt_secret";

// const corsOptions = {
//   origin: "*",
//   optionsSuccessStatus: 200,
// };

// app.use(bodyParser.json());
// app.use(cors(corsOptions));
// setupDatabase();
// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));
applyMiddlewares(app);

app.use("/v1", router);

app.listen(process.env.PORT, () => {
  console.log(`app is listening to port ${process.env.PORT}`);
});
export default app;
