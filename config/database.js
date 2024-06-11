import { Sequelize } from "sequelize";

const sequelize = new Sequelize("cms_db", "postgres", "root", {
  host: "localhost",
  user: "postgres",
  dialect: "postgres",
  port: 5432,
  password: "root",
  database: "cms_db",
});

export default sequelize;
