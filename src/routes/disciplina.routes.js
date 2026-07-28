import { Router } from "express";
import DisciplinaController from "../controllers/disciplina.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import autorizar from "../middlewares/autorizacao.middleware.js";

const router = Router();
// Criar, atualizar e remover disciplinas é restrito ao admin — professor só consulta.
// POST /api/disciplinas
router.post("/", autenticar, autorizar(["admin"]), DisciplinaController.criar);

// GET /api/disciplinas
router.get("/", autenticar, autorizar(["admin", "professor"]), DisciplinaController.listar);

// GET /api/disciplinas/:id
router.get("/:id", autenticar, autorizar(["admin", "professor"]), DisciplinaController.buscar_por_id);

// PUT /api/disciplinas/:id
router.put("/:id", autenticar, autorizar(["admin"]), DisciplinaController.atualizar);

// DELETE /api/disciplinas/:id
router.delete("/:id", autenticar, autorizar(["admin"]), DisciplinaController.deletar);

export default router;