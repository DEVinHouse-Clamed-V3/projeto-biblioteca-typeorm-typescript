import { Router } from "express";
import { getRepository } from "typeorm";
import { Auditorium } from "../entities/Auditorium";

const router = Router();

// Criar um auditório
router.post("/", async (req, res) => {
  const repository = getRepository(Auditorium);
  const auditorium = repository.create(req.body);
  await repository.save(auditorium);
  return res.status(201).json(auditorium);
});

// Buscar todos os auditórios
router.get("/", async (req, res) => {
  const repository = getRepository(Auditorium);
  const auditoriums = await repository.find();
  return res.json(auditoriums);
});

// Buscar um auditório por ID
router.get("/:id", async (req, res) => {
  const repository = getRepository(Auditorium);
  const { id } = req.params;
  const auditorium = await repository.findOne(id);
  if (!auditorium) return res.status(404).json({ message: "Auditorium not found" });
  return res.json(auditorium);
});

// Atualizar as informações de um auditório
router.put("/:id", async (req, res) => {
  const repository = getRepository(Auditorium);
  const { id } = req.params;
  const auditorium = await repository.findOne(id);
  if (!auditorium) return res.status(404).json({ message: "Auditorium not found" });

  repository.merge(auditorium, req.body);
  const updatedAuditorium = await repository.save(auditorium);
  return res.json(updatedAuditorium);
});

// Deletar um auditório
router.delete("/:id", async (req, res) => {
  const repository = getRepository(Auditorium);
  const { id } = req.params;
  const result = await repository.delete(id);
  if (result.affected === 0) return res.status(404).json({ message: "Auditorium not found" });
  return res.status(204).send();
});

export default router;
