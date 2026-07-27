// Router permite criar um conjunto separado de rotas de usuário.
import { Router } from "express";

// Controller com as ações relacionadas aos usuários.
import UsuarioController from "../controllers/usuario.controller.js";

// Middleware que valida o token JWT.
import autenticar from "../middlewares/autenticacao.middleware.js";
import autorizar from "../middlewares/autorizacao.middleware.js";

// Criamos o roteador de usuários.
const router = Router();

// Colocamos o middleware "autenticar" diretamente nas rotas protegidas.
// A ordem importa: primeiro autentica, depois chama o controller.

// GET /api/usuarios/perfil
// Retorna os dados do usuário logado.
router.get("/perfil", autenticar, autorizar(["admin", "professor", "aluno", "usuario"]), UsuarioController.perfil);

// PATCH /api/usuarios/perfil
// Atualiza nome e/ou senha do usuário logado.
router.patch("/perfil", autenticar, autorizar(["admin", "professor", "aluno", "usuario"]), UsuarioController.atualizarPerfil);

// DELETE /api/usuarios/perfil
// Remove a conta do usuário logado.
router.delete("/perfil", autenticar, autorizar(["admin", "professor", "aluno", "usuario"]), UsuarioController.removerMinhaConta);

// Exportamos o roteador para o app.js.
export default router;
