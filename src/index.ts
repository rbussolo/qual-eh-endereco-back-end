import express from "express";
import cors from "cors";

import { AppDataSource } from "./data-source";

import handleError from "./middlewares/ErrorHandler";
import { router } from "./routes";

AppDataSource.initialize();

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleError);

app.listen(port, () => console.log("Server is running at: " + port));