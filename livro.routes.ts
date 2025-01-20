import { Router } from "express";
import { BookController } from "../controllers/BookController";

const bookRoutes = Router();
const bookController = new BookController();

bookRoutes.post("/books", bookController.create);
bookRoutes.get("/books", bookController.getAll);
bookRoutes.get("/books/:id", bookController.getById);
bookRoutes.put("/books/:id", bookController.update);
bookRoutes.delete("/books/:id", bookController.delete);

export default bookRoutes;
