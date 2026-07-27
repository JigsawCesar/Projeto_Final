import { Router } from "express"
import alunoController from "../controllers/aluno.controller.js"
import autenticar from "../middlewares/autenticacao.middleware.js"

const router = Router();

router.post("/,", autenticar, alunoController.cadastrarAluno)

router.get("/", autenticar, alunoController.listarAluno)

router.get("/:id", autenticar, alunoController.listarAluno)

router.put("/:id",autenticar, alunoController.atualizarAluno)

router.delete("/:id", autenticar, alunoController.deletarAluno)

export default router