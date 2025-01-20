import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Author } from "../entities/Author";

export class AuthorController {
    async create(request: Request, response: Response) {
        const { name, birthdate, biography, nationality, active } = request.body;

        const authorRepository = AppDataSource.getRepository(Author);
        const author = authorRepository.create({ name, birthdate, biography, nationality, active });

        await authorRepository.save(author);
        return response.status(201).json(author);
    }

    async getAll(request: Request, response: Response) {
        const authorRepository = AppDataSource.getRepository(Author);
        const authors = await authorRepository.find();
        return response.json(authors);
    }

    async getById(request: Request, response: Response) {
        const { id } = request.params;

        const authorRepository = AppDataSource.getRepository(Author);
        const author = await authorRepository.findOneBy({ id: Number(id) });

        if (!author) return response.status(404).json({ message: "Author not found" });

        return response.json(author);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, birthdate, biography, nationality, active } = request.body;

        const authorRepository = AppDataSource.getRepository(Author);
        let author = await authorRepository.findOneBy({ id: Number(id) });

        if (!author) return response.status(404).json({ message: "Author not found" });

        author = { ...author, name, birthdate, biography, nationality, active };
        await authorRepository.save(author);

        return response.json(author);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const authorRepository = AppDataSource.getRepository(Author);
        const author = await authorRepository.findOneBy({ id: Number(id) });

        if (!author) return response.status(404).json({ message: "Author not found" });

        await authorRepository.remove(author);
        return response.status(204).send();
    }
}
