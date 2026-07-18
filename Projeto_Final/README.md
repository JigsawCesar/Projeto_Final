# 🦁 Projeto Final LionsDev | Aplicação Full-Stack

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Render-00E676?style=for-the-badge&logo=render&logoColor=white" alt="Render"/>
</p>

---

## 📝 Visão Geral
Esta aplicação full-stack representa o **Projeto Final de Graduação** do programa de engenharia de software **LionsDev** (Turma: Lions Dev)[cite: 1]. Construído sobre uma base arquitetural sólida, o ecossistema entrega autenticação segura, persistência de dados nativa em nuvem, camadas de domínio desacopladas e uma integração completa de ponta a ponta com a interface frontend[cite: 1].

---

## 🛠️ Tecnologias e Dependências
O ecossistema do projeto foi construído utilizando as seguintes ferramentas obrigatórias[cite: 1]:

* **Ambiente de Execução:** Node.js (Versão LTS)[cite: 1]
* **Framework Web:** Express.js[cite: 1]
* **Mapeamento de Dados (ODM):** Mongoose / MongoDB Atlas[cite: 1]
* **Segurança e Criptografia:** `bcryptjs` (Hash de senhas) e `jsonwebtoken` (Autenticação Bearer Token)[cite: 1]
* **Gerenciamento de Ambiente:** `dotenv`[cite: 1]
* **Ferramenta de Testes:** Postman (Coleção de testes inclusa no repositório)[cite: 1]
* **Ambiente de Hospedagem:** Render Web Services[cite: 1]

---

## ✨ Funcionalidades Principais
* **Sistema de Autenticação Robusto:** Cadastro de usuários com senhas protegidas por hash e fluxo de login com emissão de tokens JWT[cite: 1].
* **Controle de Acesso Protegido:** Rotas privadas do ecossistema bloqueadas por middlewares de validação de token[cite: 1].
* **Operações CRUD Completas:** Gerenciamento e manipulação total de dados para pelo menos 2 entidades do domínio[cite: 1].
* **Persistência na Nuvem:** Todas as operações realizam modificações em tempo real diretamente no MongoDB Atlas[cite: 1].
* **Regra de Negócio entre Entidades:** Lógica de fluxo exclusiva que conecta e valida interações cruzadas entre diferentes coleções de dados[cite: 1].

---

## 🗂️ Arquitetura do Sistema e Camadas
O núcleo do sistema foi construído diretamente sobre o **Boilerplate oficial da LionsDev**, implementando um modelo de arquitetura estritamente desacoplado para garantir a separação de responsabilidades[cite: 1]:

```text
src/
├── 📄 app.js             # Interceptadores globais, orquestração de rotas e tratamento de 404
├── 📄 server.js          # Inicialização do core, carregamento do ambiente e driver do MongoDB
├── 📂 config/            # Drivers de infraestrutura (conexões database.js)
├── 📂 controllers/       # Ingestão de requisições HTTP e entrega de respostas JSON estruturadas
├── 📂 middlewares/       # Barreiras de segurança, proteção de rotas e pipelines de validação
├── 📂 models/            # Schemas rígidos do Mongoose ODM para as coleções
├── 📂 repositories/      # Data Access Objects (DAO) que comunicam diretamente com o banco de dados
├── 📂 routes/            # Roteamento de rede e definições das cadeias de middlewares
├── 📂 services/          # Domínio puro de negócios isolado e restrições de validação lógica
└── 📂 utils/             # Motores utilitários reutilizáveis (geração dinâmica de erros customizados)
```

> ⚠️ **Regra Fundamental das Camadas:** Os Controllers *não* se comunicam com o banco de dados. A persistência é gerenciada estritamente pelo **Repository**, enquanto os fluxos e validações de regras de negócio ficam trancados dentro da camada de **Service**[cite: 1].

---

## 🛣️ Estrutura das Rotas da API

### 🔐 Segurança e Identidade (Nativas do Boilerplate)
| Método | Endpoint | Descrição | Tipo de Proteção |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/cadastro` | Provedor de novas credenciais de usuário | `Público` |
| `POST` | `/api/auth/login` | Validação de registros e distribuição de JWT | `Público` |
| `GET` | `/api/usuarios/perfil` | Busca metadados da identidade autenticada | `Bearer Token` |
| `PATCH` | `/api/usuarios/perfil` | Atualização de vetores dinâmicos do perfil | `Bearer Token` |
| `DELETE` | `/api/usuarios/perfil`| Descomissionamento de registros do usuário no sistema | `Bearer Token` |

### 📁 Entidades Principais do Domínio
*Substitua os marcadores abaixo com os modelos de domínio exatos do seu sistema:*[cite: 1]

#### Modelo de Entidade Alfa: `[Entidade A]`
* `POST /api/entidade-a` → Cadastrar um registro único `[Protegido]`[cite: 1]
* `GET /api/entidade-a` → Listar todos os registros salvos `[Protegido]`[cite: 1]
* `GET /api/entidade-a/:id` → Buscar uma instância única por ID `[Protegido]`[cite: 1]
* `PATCH /api/entidade-a/:id` → Atualizar campos localizados do registro `[Protegido]`[cite: 1]
* `DELETE /api/entidade-a/:id` → Remover permanentemente a entrada do sistema `[Protegido]`[cite: 1]

#### Modelo de Entidade Beta: `[Entidade B]`
* `POST /api/entidade-b` → Cadastrar um registro único `[Protegido]`[cite: 1]
* `GET /api/entidade-b` → Listar todos os registros salvos `[Protegido]`[cite: 1]
* `GET /api/entidade-b/:id` → Buscar uma instância única por ID `[Protegido]`[cite: 1]
* `PATCH /api/entidade-b/:id` → Atualizar campos localizados do registro `[Protegido]`[cite: 1]
* `DELETE /api/entidade-b/:id` → Remover permanentemente a entrada do sistema `[Protegido]`[cite: 1]

---

## ⚙️ Variáveis de Ambiente (`.env`)
Gere seu arquivo de configuração local dentro da raiz do repositório utilizando a estrutura de variáveis definida abaixo:

```ini
PORT=3000
MONGO_URI=sua_string_de_conexao_do_mongodb_atlas
JWT_SECRET=sua_chave_secreta_do_token_jwt
JWT_EXPIRES_IN=1d
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development
```

---

## 💻 Configuração e Execução Local
1. **Clonar o repositório:**
   ```bash
   git clone [URL-DO-SEU-REPOSITORIO]
   cd [DIRETORIO-DO-REPOSITORIO]
   ```
2. **Instalar os módulos de dependências:**
   ```bash
   npm install
   ```
3. **Configurar as chaves de ambiente:**
   Crie um arquivo `.env` local seguindo exatamente o padrão das variáveis definido logo acima[cite: 1].
4. **Iniciar o motor do servidor:**
   ```bash
   npm start
   ```

---

## 📮 Validação de Qualidade com Postman
Um arquivo executável de coleção de testes de integração está empacotado diretamente no diretório raiz do espaço de trabalho[cite: 1]:
* **Arquivo da Coleção:** `Nome_Do_Seu_Arquivo.postman_json`

Importe a coleção diretamente no seu Postman para rodar as suítes de testes automatizados que validam limites de tratamento de erros, identificadores malformados, bloqueios não autenticados e lógicas de fluxo de relacionamento[cite: 1].

---

## 🤖 Registro de Uso de IA
* **Plataformas de Automação Utilizadas:** `[Especificar por exemplo: FlutterFlow / v0 / ChatGPT]`[cite: 1]
* **Escopo Aplicado:** Geração rápida de layouts responsivos para a interface, estruturas visuais iniciais e ajustes de estilização pontuais no frontend[cite: 1].
* **Validação Humana:** 100% das regras de negócio do backend, lógica das camadas arquiteturais, definições de erros customizados, middlewares e associações de schemas do banco de dados foram desenvolvidos, testados e auditados manualmente pelos integrantes da equipe[cite: 1].

---

## 👥 Equipe de Engenharia
Este ecossistema de software foi projetado, testado e defendido por:
* **Lucas Vinícius Strachulski**[cite: 1]
* **Lucas Apollo**[cite: 1]
* **Wendel**[cite: 1]
* **Felipe Portela**[cite: 1]

---
<p align="center">
  <sub>Desenvolvido para cumprimento dos requisitos de avaliação dos módulos de Engenharia de Software Full-Stack da LionsDev.</sub>
</p>
