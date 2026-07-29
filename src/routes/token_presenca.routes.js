import { Router } from "express";
import TokenPresencaController from "../controllers/token_presenca.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import autorizar from "../middlewares/autorizacao.middleware.js";

const router = Router();
// POST /api/tokens-presenca -> só admin/professor podem gerar o token/QR Code de uma aula

router.post("/", autenticar, autorizar(["admin", "professor"]), TokenPresencaController.criar);
// GET /api/tokens-presenca -> lista todos os tokens (inclui o código; restrito à gestão acadêmica)

router.get("/", autenticar, autorizar(["admin", "professor"]), TokenPresencaController.listar);
// GET /api/tokens-presenca/aula/:aula_id

router.get("/aula/:aula_id", autenticar, autorizar(["admin", "professor"]), TokenPresencaController.listar_por_aula);
// GET /api/tokens-presenca/:id

router.get("/:id", autenticar, autorizar(["admin", "professor"]), TokenPresencaController.buscar_por_id);
// POST /api/tokens-presenca/validar -> qualquer usuário autenticado pode confirmar presença com o código/QR

router.post("/validar", autenticar, TokenPresencaController.validar);
// DELETE /api/tokens-presenca/:id

router.delete("/:id", autenticar, autorizar(["admin", "professor"]), TokenPresencaController.deletar);

export default router;