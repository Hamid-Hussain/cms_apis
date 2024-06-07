import express from "express";
import cors from "cors";

const applyMiddlewares = (app) => {
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.json());
};

export default applyMiddlewares;
