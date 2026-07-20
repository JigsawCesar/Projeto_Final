import express from "express";
import authRoutes from "./routes/auth.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import disciplina_routes from "./routes/disciplina.routes.js";
import erro_middleware from "./middlewares/erro.middleware.js";
import criar_erro from "./utils/criar_erro.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "API está rodando." });
});

app.use("/api/auth", authRoutes);

app.use("/api/usuarios", usuarioRoutes);

app.use("/api/disciplinas", disciplinaRoutes);

app.use((req, res, next) => {
  return next(criarErro("Rota não encontrada!", 404));
});

app.use(erro_middleware);

export default app;