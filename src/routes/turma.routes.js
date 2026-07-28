import { Router } from "express";
import TurmaController from "../controllers/turma.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import autorizar from "../middlewares/autorizacao.middleware.js";

const router = Router();

// POST /api/turmas
router.post("/", autenticar, autorizar(["admin", "professor"]), TurmaController.criar);

// GET /api/turmas
router.get("/", autenticar, autorizar(["admin", "professor"]), TurmaController.listar);

// GET /api/turmas/:id
router.get("/:id", autenticar, autorizar(["admin", "professor"]), TurmaController.buscar_por_id);

// PUT /api/turmas/:id
router.put("/:id", autenticar, autorizar(["admin", "professor"]), TurmaController.atualizar);

// DELETE /api/turmas/:id
router.delete("/:id", autenticar, autorizar(["admin", "professor"]), TurmaController.deletar);

// POST /api/turmas/:id/alunos -> matricula um aluno na turma
router.post("/:id/alunos", autenticar, autorizar(["admin", "professor"]), TurmaController.matricular);

// DELETE /api/turmas/:id/alunos/:aluno_id -> remove a matrícula
router.delete("/:id/alunos/:aluno_id", autenticar, autorizar(["admin", "professor"]), TurmaController.desmatricular);

export default router;
