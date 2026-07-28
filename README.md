# PresençaFácil — Backend (API)

API do **PresençaFácil**, sistema de lista de presença digital via QR Code dinâmico e código manual temporizado (5 minutos), desenvolvido como projeto final da LionsDev.

Este repositório contém apenas a **API**. A interface web que a consome vive em um repositório separado: [`projeto-final-frontend`](../projeto-final-frontend) (Next.js), rodando por padrão em `http://localhost:3000` enquanto esta API roda em `http://localhost:3001`.

> Este projeto nasceu de um boilerplate didático MVC (Express + MongoDB + JWT) da LionsDev, estendido pela equipe para o tema "PresençaFácil". O estado atual é **parcialmente implementado** — veja [Estado do projeto e pendências](#estado-do-projeto-e-pendências) antes de assumir que qualquer rota funciona ponta a ponta.

---

## Sumário

- [Stack tecnológica](#stack-tecnológica)
- [Como rodar localmente](#como-rodar-localmente)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Arquitetura em camadas](#arquitetura-em-camadas)
- [Modelos de dados](#modelos-de-dados)
- [Autenticação e autorização](#autenticação-e-autorização)
- [Rotas da API](#rotas-da-api)
- [Integração com o frontend](#integração-com-o-frontend)
- [Deploy](#deploy)
- [Estado do projeto e pendências](#estado-do-projeto-e-pendências)

---

## Stack tecnológica

- **Node.js** com ES Modules (`"type": "module"`)
- **Express 5** — framework HTTP
- **MongoDB** via **Mongoose 8** — banco de dados e ODM
- **jsonwebtoken** — autenticação via JWT
- **bcryptjs** — hash de senha
- **cors** — liberação de origem para o frontend
- **dotenv** — variáveis de ambiente
- **qrcode** — geração de QR Code (DataURL) para os tokens de presença

Sem TypeScript, sem testes automatizados, sem linter configurado.

## Como rodar localmente

Pré-requisito: uma instância MongoDB acessível (local ou Atlas).

```bash
npm install
cp .env.example .env   # crie o arquivo com as chaves da seção abaixo, se ainda não existir
npm start
```

A API sobe na porta definida por `PORT` (não há script `dev`/watch configurado — `npm start` roda `node src/server.js` diretamente).

Para usar com o frontend localmente, mantenha o CORS default (`http://localhost:3000`, configurado em [src/app.js](src/app.js)) ou ajuste-o se o frontend rodar em outra origem.

## Variáveis de ambiente

Definidas em `.env` (nunca commitado — está no `.gitignore`):

| Variável | Uso |
|---|---|
| `PORT` | Porta em que o Express sobe |
| `MONGO_URI` | String de conexão do MongoDB |
| `JWT_SECRET` | Segredo usado para assinar/verificar os tokens JWT |
| `JWT_EXPIRES_IN` | Validade pretendida do token (⚠️ hoje **não é lida pelo código** — o valor de expiração está hardcoded em `8h` em `auth.service.js`) |
| `BCRYPT_SALT_ROUNDS` | Custo do hash pretendido (⚠️ hoje **não é lida pelo código** — o custo está hardcoded em `10` em `auth.service.js`) |

Adicionalmente, o código de login (`src/services/auth.service.js`) espera `ADMIN_EMAIL` e `ADMIN_SENHA` para permitir login com `tipo: "admin"`, mas **essas variáveis não existem no `.env` atual** — login como admin falha até serem adicionadas manualmente.

## Arquitetura em camadas

Estrutura exigida pelo boilerplate do curso, em `src/`:

```
src/
├── app.js                # Monta o Express: CORS, rotas, 404, middleware de erro
├── server.js              # Ponto de entrada: carrega .env, conecta ao banco, sobe o servidor
├── config/database.js      # Conexão Mongoose (MONGO_URI)
├── models/                  # Schemas Mongoose
├── repositories/             # Única camada que acessa os Models/MongoDB
├── services/                  # Regras de negócio e validações
├── controllers/                # Camada HTTP: recebe req, chama service, responde res.json()
├── routes/                      # Define endpoints Express e aplica middlewares
├── middlewares/                  # Autenticação JWT, autorização por papel, validação de campos, erro central
└── utils/                         # Helpers (criar_erro, gerarRA)
```

Fluxo de uma requisição: `routes → middlewares → controller → service → repository → model`. Controllers nunca acessam o banco diretamente; quem decide regra de negócio é sempre o service.

## Modelos de dados

Todos os schemas usam `timestamps: true`.

| Model | Campos principais | Observações |
|---|---|---|
| **Aluno** | `nome`, `email` (único), `cpf` (11 dígitos), `senhaHash` (`select: false`) | Não possui campo `ra` nem `curso` (ver pendências) |
| **Professor** | `nome`, `email` (único), `cpf` (11 dígitos), `senhaHash` (`select: false`) | Não possui campo `disciplina` |
| **Disciplina** | `nome`, `codigo` (único), `carga_horaria` | — |
| **Semestre** | `ano`, `periodo` | Unicidade de `ano + periodo` garantida no service |
| **Turma** | `nome`, `horario`, `disciplina` (ref `Disciplina`), `professor` (ref `Professor`), `semestre` (ref `Semestre`), `alunos` (array de refs `Aluno`) | — |
| **Aula** | `turma` (ref `Turma`), `data`, `horario`, `status` (`fechada`/`aberta`, default `fechada`) | Abrir/fechar é feito via as ações da rota (ver [Rotas da API](#rotas-da-api)), não editando o campo diretamente |
| **TokenPresenca** | `aula` (ref `Aula`), `codigo` (único), `qr_code` (DataURL), `ativo` (bool), `data_expiracao` | Gerado automaticamente ao abrir uma aula |
| **Presenca** | `aluno` (ref `Aluno`), `aula` (ref `Aula`), `token` (ref `TokenPresenca`), `data_registro`, `status` (`presente`/`atrasado`/`justificado`) | Model existe mas **sem controller/service/repository/rotas** — ainda não é possível o aluno confirmar presença pela API (ver pendências) |

## Autenticação e autorização

1. **Cadastro** (`POST /api/auth/cadastro`) grava a senha com hash bcrypt.
2. **Login** (`POST /api/auth/login`) valida credenciais e retorna um JWT (payload `{ id, email, tipo }`, expiração de 8h) assinado com `JWT_SECRET`.
3. O frontend envia esse token em `Authorization: Bearer <token>` nas rotas protegidas.

Middlewares (`src/middlewares/`):

- **`autenticar`** — lê e valida o header `Authorization`, decodifica o JWT e popula `req.usuario = { id, email, tipo }`. Sem token válido → 401.
- **`autorizar(tiposPermitidos)`** — fábrica de middleware que restringe o acesso por papel (`admin`, `professor`, `aluno`, `usuario`). Usado em `usuarios` (qualquer papel autenticado); em `semestres`, `alunos`, `turmas` e `aulas` (leitura e escrita restritas a `admin`/`professor`, para que uma conta de aluno não acesse dados de gestão acadêmica); e em `disciplinas`/`professor`, onde a leitura é liberada para `admin`/`professor`, mas **criar, atualizar e excluir é restrito só a `admin`** — um professor não gerencia outros professores nem o catálogo de disciplinas, só consulta. **Não** é usado em `tokens-presenca` — essa rota só exige estar autenticado, sem checar o papel.
- **`validarCadastro` / `validarLogin`** — garantem presença dos campos obrigatórios no body de `/api/auth/*`.
- **`erro_middleware`** — trata centralmente `ValidationError`/`CastError` do Mongoose, duplicidade (`code 11000`) e erros customizados criados via `utils/criar_erro.js`.

## Rotas da API

Prefixo definido em [src/app.js](src/app.js). CORS liberado para `http://localhost:3000`, métodos `GET, POST, PUT, PATCH, DELETE, OPTIONS`, com `credentials: true`.

`GET /` → healthcheck (`{ message: "API está rodando." }`), sem autenticação.

### `POST /api/auth/cadastro` — pública
Body: `{ nome, email, cpf, senha, tipo? }` (`tipo`: `"aluno"` | `"professor"`, default `"aluno"`). Verifica duplicidade de email/cpf, cria o registro com senha hasheada.

### `POST /api/auth/login` — pública
Body: `{ email, senha, tipo? }`. Retorna `{ token, tipo, usuario }`. Se `tipo: "admin"`, valida contra `ADMIN_EMAIL`/`ADMIN_SENHA` (não configuradas hoje).

### `/api/usuarios` — autenticado (qualquer papel)
| Método | Path | Descrição |
|---|---|---|
| GET | `/perfil` | Dados do usuário logado (`req.usuario`) |
| PATCH | `/perfil` | Atualiza nome/email/cpf/senha do próprio usuário |
| DELETE | `/perfil` | Remove a própria conta (admin não pode ser removido) |

### `/api/disciplinas` — autenticado; leitura `admin`/`professor`, escrita só `admin`
CRUD completo: `POST /`, `GET /`, `GET /:id`, `PUT /:id`, `DELETE /:id`. Valida código duplicado. `POST`/`PUT`/`DELETE` exigem `admin` — professor só lista/consulta (precisa da lista para vincular a Turma).

### `/api/semestres` — mesmo padrão de autorização de disciplinas
CRUD completo: `POST /`, `GET /`, `GET /:id`, `PUT /:id`, `DELETE /:id`. Valida `ano + periodo` duplicado.

### `/api/turmas` — autenticado; restrito a `admin`/`professor`
| Método | Path | Descrição |
|---|---|---|
| POST | `/` | Cria turma (`nome, horario, disciplina, professor, semestre, alunos?`), valida que disciplina/professor/semestre existem |
| GET | `/` | Lista turmas — **professor só vê as turmas em que ele é o responsável** (RN-005); admin vê todas |
| GET | `/:id` | Busca turma por id (com disciplina/professor/semestre/alunos populados) |
| PUT | `/:id` | Atualiza campos da turma, incluindo o array `alunos` (sobrescreve a lista completa) |
| DELETE | `/:id` | Remove a turma |
| POST | `/:id/alunos` | Matricula um aluno (`{ aluno_id }`) na turma, sem duplicar |
| DELETE | `/:id/alunos/:aluno_id` | Remove a matrícula do aluno na turma |

### `/api/aulas` — autenticado; restrito a `admin`/`professor`
| Método | Path | Descrição |
|---|---|---|
| POST | `/` | Cria aula (`turma, data, horario`), status inicial `fechada` |
| GET | `/` | Lista aulas — professor só vê aulas de suas próprias turmas (RN-005); admin vê todas |
| GET | `/turma/:turma_id` | Lista aulas de uma turma específica |
| GET | `/:id` | Busca aula por id |
| PUT | `/:id` | Atualiza turma/data/horario da aula |
| DELETE | `/:id` | Remove a aula |
| PATCH | `/:id/abrir` | **Abre a lista de presença**: gera um `TokenPresenca` (código + QR Code, expira em 5 min) para a aula e marca `status: "aberta"`. Retorna `{ aula, token }` |
| PATCH | `/:id/fechar` | **Fecha a lista de presença**: invalida (`ativo: false`) qualquer token ainda ativo da aula e marca `status: "fechada"` |

`abrir`/`fechar` são a regra de negócio que conecta Aula + TokenPresenca (RF-006, RF-007, RF-016, RN-007, RN-009) — é o fluxo que o professor usa para gerar e depois encerrar o QR Code/código manual de uma aula.

### `/api/tokens-presenca` — autenticado (sem restrição de papel)
| Método | Path | Descrição |
|---|---|---|
| POST | `/` | Gera código de 6 hex chars + QR Code (DataURL), expira em 5 min |
| GET | `/` | Lista todos os tokens |
| GET | `/aula/:aula_id` | Lista tokens de uma aula |
| GET | `/:id` | Busca token por id |
| POST | `/validar` | Valida `{ codigo }`: existe, está ativo, não expirou; marca como usado (`ativo: false`) |
| DELETE | `/:id` | Remove token |

### `/api/alunos` — autenticado; restrito a `admin`/`professor`
CRUD de alunos: `POST /`, `GET /` (filtros via query `nome/email/cpf/id`), `GET /:id`, `PUT /:id`, `DELETE /:id`. Uma conta de aluno não acessa esta rota — só vê os próprios dados via `/api/usuarios/perfil`.

### `/api/professor` — autenticado; leitura `admin`/`professor`, escrita só `admin`
CRUD de professores: `POST /`, `GET /` (filtros via query `nome/email/cpf/id`), `GET /:id`, `PUT /:id`, `DELETE /:id`. `POST`/`PUT`/`DELETE` exigem `admin` — um professor não cria, edita nem remove outros professores, só consulta a lista (precisa dela para vincular a Turma).

Rota não encontrada → 404 `{ mensagem: "Rota não encontrada!" }` via middleware central.

## Integração com o frontend

O [`projeto-final-frontend`](../projeto-final-frontend) não usa nenhum `.env` — a URL desta API é configurada em runtime pelo usuário (padrão `http://localhost:3001`) e o JWT retornado no login é guardado em `localStorage` e reenviado em todo request subsequente via header `Authorization`. Para detalhes de como cada tela do painel consome estas rotas, veja o README do frontend.

## Deploy

Configurado para o [Render](https://render.com) via [render.yaml](render.yaml): serviço `web`/Node, plano free, `buildCommand: npm install`, `startCommand: npm start`, autoDeploy habilitado. `MONGO_URI` precisa ser preenchida manualmente no painel do Render; `JWT_SECRET` é gerado automaticamente; `JWT_EXPIRES_IN` e `BCRYPT_SALT_ROUNDS` já vêm configuradas lá (mesmo não sendo lidas pelo código hoje).

## Estado do projeto e pendências

Pontos observados no código atual, relevantes para quem for continuar o desenvolvimento:

- **Bug de rota em `aluno.routes.js`**: `router.post("/,", ...)` (vírgula sobrando) torna o cadastro de aluno inacessível em `POST /api/alunos` — hoje só é possível cadastrar aluno via `/api/auth/cadastro`.
- **`GET /api/alunos/:id`** (e o equivalente em `/api/professor/:id`) está ligado à mesma função de listagem geral, que só lê `req.query` — buscar por id na URL não funciona, é preciso usar `?id=`.
- **`GET /api/disciplinas`** chama `DisciplinaService.listarTodas()`, mas o service exporta `listar_todas` — quebra em runtime.
- **Typo em `disciplina.service.js`** (`atualizar`): usa `cria_erro` em vez de `criar_erro`.
- **`ADMIN_EMAIL`/`ADMIN_SENHA`** ausentes do `.env` — login como admin sempre falha hoje.
- **`JWT_EXPIRES_IN`/`BCRYPT_SALT_ROUNDS`** não são lidas pelo código (valores hardcoded).
- **`Presenca`** (model + a camada completa de controller/service/repository/routes) ainda não foi implementada — o aluno ainda não tem como confirmar a própria presença pela API; hoje o fluxo vai até "professor abre a aula, QR Code/código são gerados e podem ser validados", mas a confirmação não gera um registro de `Presenca` nem alimenta um relatório de frequência (RF-011 a RF-013 pendentes).
- **Geração automática de RA** (`utils/gerarRA.js`) existe mas não é chamada em nenhum lugar, e o schema de Aluno não tem campo `ra`.

O que já funciona de ponta a ponta: cadastro/login de aluno e professor com JWT + bcrypt; CRUD de Semestre (`admin`/`professor`) e de Disciplina/Professor (leitura `admin`/`professor`, escrita só `admin`, exceto o bug do `listarTodas` de Disciplina); CRUD de Aluno e de Turma (com matrícula de alunos) e Aula (`admin`/`professor`); abrir/fechar aula gerando e invalidando o token + QR Code automaticamente; controle de acesso por papel impedindo que uma conta de aluno acesse rotas de gestão acadêmica e que um professor gerencie outros professores ou o catálogo de disciplinas.
