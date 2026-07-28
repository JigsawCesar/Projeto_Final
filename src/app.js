import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import disciplina_routes from "./routes/disciplina.routes.js";
import erro_middleware from "./middlewares/erro.middleware.js";
import criar_erro from "./utils/criar_erro.js";
import semestre_routes from "./routes/semestre.routes.js";
import token_presenca_routes from "./routes/token_presenca.routes.js";
import aluno_routes from "./routes/aluno.routes.js"
import professor_routes from "./routes/professor.routes.js"
import turma_routes from "./routes/turma.routes.js"
import aula_routes from "./routes/aula.routes.js"

const app = express();
app.use(express.json());

// Habilita CORS para o front-end em desenvolvimento
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  return res.status(200).json({ message: "API está rodando." });
});

app.use("/api/auth", authRoutes);

app.use("/api/usuarios", usuarioRoutes);

app.use("/api/disciplinas", disciplina_routes);

app.use("/api/semestres", semestre_routes);

app.use("/api/tokens-presenca", token_presenca_routes);

app.use("/api/alunos", aluno_routes)

app.use("/api/professor", professor_routes)

app.use("/api/turmas", turma_routes)

app.use("/api/aulas", aula_routes)

app.use((req, res, next) => {
  return next(criar_erro("Rota não encontrada!", 404));
});

app.use(erro_middleware);

export default app;