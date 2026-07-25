import { Router } from "express";
import DisciplinaController from "../controllers/disciplina.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";

const router = Router();
// POST /api/disciplinas
router.post("/", autenticar, DisciplinaController.criar);

// GET /api/disciplinas
router.get("/", autenticar, DisciplinaController.listar);

// GET /api/disciplinas/:id
router.get("/:id", autenticar, DisciplinaController.buscar_por_id);

// PUT /api/disciplinas/:id
router.put("/:id", autenticar, DisciplinaController.atualizar);

// DELETE /api/disciplinas/:id
router.delete("/:id", autenticar, DisciplinaController.deletar);

export default router;