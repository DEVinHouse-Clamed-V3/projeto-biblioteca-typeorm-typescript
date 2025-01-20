import { Request } from "express";
import { AppDataSource } from "../database/data-source";
import { Router } from "express";
import Autor from "../entities/Autor";

const autorRoutes = Router();

const authorRepository = AppDataSource.getRepository(Autor);

// Criar um autor
autorRoutes.post("/", async (req, res) => {
  try {
    const { name, birthdate, biography, nationality, active } = req.body;

    if (!name) {
      return res.status(400).json({ error: "O campo nome é obrigatório" });
    }
    if (!nationality) {
      return res
        .status(400)
        .json({ error: "O campo nacionalidade é obrigatório" });
    }

    const author = new Autor();
    author.name = name;
    author.birthdate = birthdate;
    author.biography = biography;
    author.nationality = nationality;
    author.active = active !== undefined ? active : true;

    const createdAuthor = await authorRepository.save(author);
    return res.status(201).json(createdAuthor);
  } catch (error) {
    console.error("Erro ao criar autor:", error);
    return res.status(500).json({ error: "Erro ao criar autor" });
  }
});

// Listar todos os autores
autorRoutes.get("/", async (_req, res) => {
  try {
    const authors = await authorRepository.find({
      order: { name: "ASC" }, // Ordena alfabeticamente pelo nome
    });
    return res.json(authors);
  } catch (error) {
    console.error("Erro ao buscar autores:", error);
    return res.status(500).json({ error: "Erro ao buscar autores" });
  }
});

// Buscar um autor pelo ID
autorRoutes.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const author = await authorRepository.findOne({ where: { id } });

    if (!author) {
      return res.status(404).json({ error: "Autor não encontrado" });
    }

    return res.json(author);
  } catch (error) {
    console.error("Erro ao buscar autor:", error);
    return res.status(500).json({ error: "Erro ao buscar autor" });
  }
});

// Atualizar um autor
autorRoutes.put("/:id", async (req: Request, res) => {
  try {
    const id = Number(req.params.id);
    const { name, birthdate, biography, nationality, active } = req.body;

    const author = await authorRepository.findOne({ where: { id } });

    if (!author) {
      return res.status(404).json({ error: "Autor não encontrado" });
    }

    if (name !== undefined) author.name = name;
    if (birthdate !== undefined) author.birthdate = birthdate;
    if (biography !== undefined) author.biography = biography;
    if (nationality !== undefined) author.nationality = nationality;
    if (active !== undefined) author.active = active;

    const updatedAuthor = await authorRepository.save(author);
    return res.json(updatedAuthor);
  } catch (error) {
    console.error("Erro ao atualizar autor:", error);
    return res.status(500).json({ error: "Erro ao atualizar autor" });
  }
});

// Deletar um autor
autorRoutes.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleteResult = await authorRepository.delete(id);

    if (deleteResult.affected === 0) {
      return res
        .status(404)
        .json({ error: "Autor não encontrado e não foi deletado" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar autor:", error);
    return res.status(500).json({ error: "Erro ao deletar autor" });
  }
});

export default autorRoutes;
