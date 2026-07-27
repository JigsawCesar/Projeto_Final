import { Router } from "express";
import DisciplinaController from "../controllers/disciplina.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import autorizar from "../middlewares/autorizacao.middleware.js";

const router = Router();
// POST /api/disciplinas
router.post("/", autenticar, autorizar(["admin", "professor"]), DisciplinaController.criar);

// GET /api/disciplinas
router.get("/", autenticar, autorizar(["admin", "professor", "aluno", "usuario"]), DisciplinaController.listar);

// GET /api/disciplinas/:id
router.get("/:id", autenticar, autorizar(["admin", "professor", "aluno", "usuario"]), DisciplinaController.buscar_por_id);

// PUT /api/disciplinas/:id
router.put("/:id", autenticar, autorizar(["admin", "professor"]), DisciplinaController.atualizar);

// DELETE /api/disciplinas/:id
router.delete("/:id", autenticar, autorizar(["admin", "professor"]), DisciplinaController.deletar);

export default router;