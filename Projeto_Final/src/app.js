import express from "express";
import authRoutes from "./routes/auth.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import disciplina_routes from "./routes/disciplina.routes.js";
import erro_middleware from "./middlewares/erro.middleware.js";
import criar_erro from "./utils/criar_erro.js";
import semestre_routes from "./routes/semestre.routes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "API está rodando." });
});

app.use("/api/auth", authRoutes);

app.use("/api/usuarios", usuarioRoutes);

app.use("/api/disciplinas", disciplina_routes);

app.use("/api/semestres", semestre_routes);

app.use((req, res, next) => {
  return next(criar_erro("Rota não encontrada!", 404));
});

app.use(erro_middleware);

export default app;