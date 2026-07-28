// Router permite criar um conjunto de rotas separado para autenticação.
import { Router } from "express";

// Controller com as funções de cadastro e login.
import AuthController from "../controllers/auth.controller.js";

// Middlewares que conferem os campos obrigatórios de cada rota.
// São duas funções: uma para o cadastro e outra para o login.
import validarCampos from "../middlewares/validarCampos.middleware.js";

// Cadastro de aluno/professor deixou de ser público: só um admin autenticado pode cadastrar.
import autenticar from "../middlewares/autenticacao.middleware.js";
import autorizar from "../middlewares/autorizacao.middleware.js";

// Criamos o roteador de autenticação.
const router = Router();

// POST /api/auth/cadastro
// Exige admin autenticado; depois confere os campos; depois o controller faz o cadastro.
router.post(
  "/cadastro",
  autenticar,
  autorizar(["admin"]),
  validarCampos.validarCadastro,
  AuthController.cadastrar,
);

// POST /api/auth/login
// Primeiro o middleware confere email/senha; depois o controller faz o login.
router.post("/login", validarCampos.validarLogin, AuthController.login);

// Exportamos o roteador para ser usado no app.js.
export default router;
