import { Router } from "express";
import PresencaController from "../controllers/presenca.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import autorizar from "../middlewares/autorizacao.middleware.js";

const router = Router();

// POST /api/presencas -> aluno confirma a própria presença; admin/professor podem registrar em nome de um aluno.
router.post("/", autenticar, autorizar(["admin", "professor", "aluno"]), PresencaController.registrar);

// GET /api/presencas -> lista todas as presenças (gestão acadêmica)
router.get("/", autenticar, autorizar(["admin", "professor"]), PresencaController.listar);

// GET /api/presencas/minha-frequencia -> dashboard de frequência (% presença/falta) do próprio aluno
router.get(
  "/minha-frequencia",
  autenticar,
  autorizar(["aluno"]),
  PresencaController.minha_frequencia,
);

// GET /api/presencas/relatorio/:turma_id -> relatório de frequência da turma
router.get(
  "/relatorio/:turma_id",
  autenticar,
  autorizar(["admin", "professor"]),
  PresencaController.relatorio_por_turma,
);

// GET /api/presencas/aluno/:aluno_id -> histórico de presenças de um aluno (o próprio aluno ou admin/professor)
router.get(
  "/aluno/:aluno_id",
  autenticar,
  autorizar(["admin", "professor", "aluno"]),
  PresencaController.listar_por_aluno,
);

// DELETE /api/presencas/:id -> corrige um registro de presença indevido
router.delete("/:id", autenticar, autorizar(["admin", "professor"]), PresencaController.deletar);

export default router;
