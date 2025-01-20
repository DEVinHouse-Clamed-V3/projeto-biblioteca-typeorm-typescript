import { Router } from "express";
import { getRepository } from "typeorm";
import { Reader } from "../entities/Reader";

const router = Router();

router.post("/", async (req, res) => {
  const repository = getRepository(Reader);
  const reader = repository.create(req.body);
  await repository.save(reader);
  return res.status(201).json(reader);
});

router.get("/", async (req, res) => {
  const repository = getRepository(Reader);
  const readers = await repository.find();
  return res.json(readers);
});

router.get("/:id", async (req, res) => {
  const repository = getRepository(Reader);
  const { id } = req.params;
  const reader = await repository.findOne(id);
  if (!reader) return res.status(404).json({ message: "Reader not found" });
  return res.json(reader);
});

router.put("/:id", async (req, res) => {
  const repository = getRepository(Reader);
  const { id } = req.params;
  const reader = await repository.findOne(id);
  if (!reader) return res.status(404).json({ message: "Reader not found" });

  repository.merge(reader, req.body);
  const updatedReader = await repository.save(reader);
  return res.json(updatedReader);
});

router.delete("/:id", async (req, res) => {
  const repository = getRepository(Reader);
  const { id } = req.params;
  const result = await repository.delete(id);
  if (result.affected === 0) return res.status(404).json({ message: "Reader not found" });
  return res.status(204).send();
});

export default router;
