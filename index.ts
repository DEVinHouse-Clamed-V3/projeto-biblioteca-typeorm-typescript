import express from "express";
import { AppDataSource } from "./data-source";
import { authorRoutes } from "./routes/autor.routes";
import {livro.routes} from "./routes/livro.routes";
import {leitor.routes} from "./routes/leitor.routes"
import {auditorio.routes} from "./routes/auditorio.routes"
const app = express();

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected!");
        app.use(express.json());
        app.use(authorRoutes);

        app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch((error) => console.log(error));
