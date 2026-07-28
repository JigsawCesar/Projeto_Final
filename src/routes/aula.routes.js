import { Router } from "express";
import AulaController from "../controllers/aula.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import autorizar from "../middlewares/autorizacao.middleware.js";

const router = Router();

// POST /api/aulas
router.post("/", autenticar, autorizar(["admin", "professor"]), AulaController.criar);

// GET /api/aulas
router.get("/", autenticar, autorizar(["admin", "professor"]), AulaController.listar);

// GET /api/aulas/turma/:turma_id
router.get("/turma/:turma_id", autenticar, autorizar(["admin", "professor"]), AulaController.listar_por_turma);

// GET /api/aulas/:id
router.get("/:id", autenticar, autorizar(["admin", "professor"]), AulaController.buscar_por_id);

// PUT /api/aulas/:id
router.put("/:id", autenticar, autorizar(["admin", "professor"]), AulaController.atualizar);

// DELETE /api/aulas/:id
router.delete("/:id", autenticar, autorizar(["admin", "professor"]), AulaController.deletar);

// PATCH /api/aulas/:id/abrir -> abre a lista de presença e gera o token + QR Code
router.patch("/:id/abrir", autenticar, autorizar(["admin", "professor"]), AulaController.abrir);

// PATCH /api/aulas/:id/fechar -> fecha a lista de presença e invalida os tokens ativos
router.patch("/:id/fechar", autenticar, autorizar(["admin", "professor"]), AulaController.fechar);

export default router;
