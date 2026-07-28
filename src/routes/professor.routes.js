import { Router } from "express";
import autenticar from "../middlewares/autenticacao.middleware.js"
import autorizar from "../middlewares/autorizacao.middleware.js"
import professorController from "../controllers/professor.controller.js";

const router = Router();

// Criar, atualizar e remover professores é restrito ao admin — um professor não gerencia outros professores.
router.post("/", autenticar, autorizar(["admin"]), professorController.cadastrarProfessor)

router.get("/", autenticar, autorizar(["admin", "professor"]), professorController.listarProfessor)

router.get("/:id", autenticar, autorizar(["admin", "professor"]), professorController.listarProfessor)

router.put("/:id", autenticar, autorizar(["admin"]), professorController.atualizarProfessor)

router.delete("/:id", autenticar, autorizar(["admin"]), professorController.deletarProfessor)

export default router
