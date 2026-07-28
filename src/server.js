// dotenv carrega as variáveis do arquivo .env para process.env.
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// app contém toda a configuração do Express.
import app from "./app.js";

// Função que conecta no MongoDB.
import conectarBanco from "./config/database.js";

// Carrega o arquivo .env que fica na raiz do backend, independente de
// onde o comando "node" foi executado.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// No Render, a porta vem de process.env.PORT.
// No computador local, se não houver PORT, usamos 3000.
// process.env sempre guarda valores como texto, por isso usamos fallback simples aqui.
const PORT = process.env.PORT || 3000;

try {
  // Antes de subir o servidor, conectamos ao banco.
  conectarBanco();

  // Se a conexão deu certo, iniciamos o servidor HTTP.
  app.listen(PORT, () => {
    console.log(`\n=========================================\n| O servidor está rodando na porta ${PORT} |\n=========================================`);
  });
} catch (error) {
  // Se a conexão ou a inicialização falhar, mostramos o erro no terminal.
  console.error("| Erro ao iniciar a aplicação:", error.message);
  console.log("=========================================");

  // Encerramos o processo para não deixar a aplicação rodando sem banco.
  process.exit(1);
}
