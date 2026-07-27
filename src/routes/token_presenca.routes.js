import { Router } from "express";
import TokenPresencaController from "../controllers/token_presenca.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";

const router = Router();
// POST /api/tokens-presenca

router.post("/", autenticar, TokenPresencaController.criar);
// GET /api/tokens-presenca

router.get("/", autenticar, TokenPresencaController.listar);
// GET /api/tokens-presenca/aula/:aula_id

router.get("/aula/:aula_id", autenticar, TokenPresencaController.listar_por_aula);
// GET /api/tokens-presenca/:id

router.get("/:id", autenticar, TokenPresencaController.buscar_por_id);
// POST /api/tokens-presenca/validar

router.post("/validar", autenticar, TokenPresencaController.validar);
// DELETE /api/tokens-presenca/:id

router.delete("/:id", autenticar, TokenPresencaController.deletar);

export default router;