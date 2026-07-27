import {express} from "express";
import autenticar from "../middlewares/autenticacao.middleware.js"
import professorController from "../controllers/professor.controller.js";

const router = router();

router.post("/", autenticar, professorController.cadastrarProfessor)

router.get("/", autenticar, professorController.listarProfessor)

router.get(":/id", autenticar, professorController.listarProfessor)

router.put(":/id", autenticar, professorController.atualizarProfessor)

router.delete(":/id", autenticar, professorController.deletarProfessor)

export default router
