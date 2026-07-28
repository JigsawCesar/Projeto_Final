import { Router } from "express"
import alunoController from "../controllers/aluno.controller.js"
import autenticar from "../middlewares/autenticacao.middleware.js"
import autorizar from "../middlewares/autorizacao.middleware.js"

const router = Router();

router.post("/", autenticar, autorizar(["admin", "professor"]), alunoController.cadastrarAluno)

router.get("/", autenticar, autorizar(["admin", "professor"]), alunoController.listarAluno)

router.get("/:id", autenticar, autorizar(["admin", "professor"]), alunoController.listarAluno)

router.put("/:id", autenticar, autorizar(["admin", "professor"]), alunoController.atualizarAluno)

router.delete("/:id", autenticar, autorizar(["admin", "professor"]), alunoController.deletarAluno)

export default router
