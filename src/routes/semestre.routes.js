import { Router } from "express";
import SemestreController from "../controllers/semestre.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import autorizar from "../middlewares/autorizacao.middleware.js";

const router = Router();
// POST /api/semestres

router.post("/", autenticar, autorizar(["admin", "professor"]), SemestreController.criar);
// GET /api/semestres

router.get("/", autenticar, autorizar(["admin", "professor"]), SemestreController.listar);
// GET /api/semestres/:id

router.get("/:id", autenticar, autorizar(["admin", "professor"]), SemestreController.buscar_por_id);
// PUT /api/semestres/:id

router.put("/:id", autenticar, autorizar(["admin", "professor"]), SemestreController.atualizar);
// DELETE /api/semestres/:id

router.delete("/:id", autenticar, autorizar(["admin", "professor"]), SemestreController.deletar);

export default router;