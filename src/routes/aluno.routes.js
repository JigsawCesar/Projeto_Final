import { Router } from "express"
import alunoController from "../controllers/aluno.controller.js"
import autenticar from "../middlewares/autenticacao.middleware.js"
import autorizar from "../middlewares/autorizacao.middleware.js"

const router = Router();

// Cadastrar, atualizar e remover aluno é restrito ao admin — professor só consulta.
router.post("/", autenticar, autorizar(["admin"]), alunoController.cadastrarAluno)

router.get("/", autenticar, autorizar(["admin", "professor"]), alunoController.listarAluno)

router.get("/:id", autenticar, autorizar(["admin", "professor"]), alunoController.listarAluno)

router.put("/:id", autenticar, autorizar(["admin"]), alunoController.atualizarAluno)

router.delete("/:id", autenticar, autorizar(["admin"]), alunoController.deletarAluno)

export default router
