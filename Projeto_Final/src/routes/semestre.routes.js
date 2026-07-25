import { Router } from "express";
import SemestreController from "../controllers/semestre.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";

const router = Router();
// POST /api/semestres

router.post("/", autenticar, SemestreController.criar);
// GET /api/semestres

router.get("/", autenticar, SemestreController.listar);
// GET /api/semestres/:id

router.get("/:id", autenticar, SemestreController.buscar_por_id);
// PUT /api/semestres/:id

router.put("/:id", autenticar, SemestreController.atualizar);
// DELETE /api/semestres/:id

router.delete("/:id", autenticar, SemestreController.deletar);

export default router;