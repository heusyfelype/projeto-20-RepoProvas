import express from "express";// import "express-async-errors";
import "express-async-errors";
import router from "./src/routers/index.js";

const app = express();

app.use(express.json());
app.use(router);
// app.use(handleError);

export default app;