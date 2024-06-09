import "dotenv/config";
import express from "express";

import sequelize from "./config/database";
import applyMiddlewares from "./middlewares";
import router from "./routes";

const { swaggerUi, specs } = require("./config/swagger");

const app = express();

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));
applyMiddlewares(app);

app.use("/v1", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(process.env.PORT, () => {
  console.log(`app is listening to port ${process.env.PORT}`);
});

export default app;
