---
name: lionsdev-entity-scaffold
description: >
  Gera os 5 arquivos CRUD (model, repository, service, controller, routes) para uma nova entidade
  do projeto PresençaFácil seguindo o padrão LionsDev (ES Modules, Mongoose, Express).
  Recebe o nome da entidade e seus campos, e cria todos os arquivos + registra as rotas no app.js.
---

# LionsDev Entity CRUD Scaffold

Gera o CRUD completo para uma entidade do projeto PresençaFácil seguindo o padrão de camadas do boilerplate LionsDev.

## Entrada esperada

O usuário fornece:
1. **Nome da entidade** (ex: `Disciplina`, `Semestre`, `Turma`, `Aula`, `TokenPresenca`, `Presenca`, `Aluno`, `Professor`)
2. **Campos principais** com tipo e regras (ex: `nome: String, obrigatório`, `ano: Number, obrigatório`)
3. **Relacionamentos** (refs para outras entidades, se houver)
4. **Rotas extras de fluxo** (se aplicável, ex: `POST /api/aulas/:id/abrir`)

Se o usuário não detalhar os campos, use os do `Plano_de_Acao_PresencaFacil.md` como referência.

## Procedimento

### 1. Criar model (`src/models/<entidade>.model.js`)

Seguir o padrão de `usuario.model.js`:
- Importar `mongoose`
- Criar Schema com os campos fornecidos
- Usar `required: [true, "Mensagem"]`, `trim: true`, `unique: true` quando aplicável
- Para IDs automáticos (ex: RA de aluno): usar campo com `default` calculado no service
- `timestamps: true` no segundo argumento do Schema
- Exportar o Model com `mongoose.model("Nome", Schema)`

**Campos de referência (refs)** usar:
```js
disciplina: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Disciplina",
  required: [true, "A disciplina é obrigatória."],
}
```

### 2. Criar repository (`src/repositories/<entidade>.repository.js`)

Seguir o padrão de `usuario.repository.js`:
- Importar o Model
- Funções assíncronas: `criar`, `buscarPorId`, `listarTodos` (com `.sort({ createdAt: -1 })`), `atualizarPorId` (com `{ new: true, runValidators: true }`), `deletarPorId`
- Funções extras conforme necessidade: `buscarPorCampo`, etc.
- Exportar como objeto nomeado

### 3. Criar service (`src/services/<entidade>.service.js`)

Seguir o padrão de `usuario.service.js`:
- Importar o repository e `criarErro`
- Função `montarEntidadeSegura(doc)` para limpar campos sensíveis (`__v`, campos internos)
- Funções CRUD que chamam o repository
- Validações de negócio (ex: verificar duplicidade antes de criar)
- Para RA automático: lógica de geração no service (formato `2026 + sequencial`)
- Exportar como objeto nomeado

### 4. Criar controller (`src/controllers/<entidade>.controller.js`)

Seguir o padrão de `usuario.controller.js`:
- Importar o service
- Cada função: `async function nome(req, res, next)` com `try/catch`
- Sucesso: `res.status(200).json({ entidade })` ou `res.status(201).json(...)`
- Erro: `return next(error)`
- Exportar como objeto nomeado

### 5. Criar routes (`src/routes/<entidade>.routes.js`)

Seguir o padrão de `usuario.routes.js`:
- Importar `Router` do Express, o controller, e `autenticar` do middleware
- Rotas padrão CRUD:
  - `POST /` → criar (pode ter middleware de validação)
  - `GET /` → listarTodos
  - `GET /:id` → buscarPorId
  - `PATCH /:id` → atualizarPorId
  - `DELETE /:id` → deletarPorId
- Rotas protegidas usam `autenticar` como segundo argumento
- Exportar o router

### 6. Registrar no app.js

Adicionar a importação e o `app.use("/api/<entidades>", <entidade>Routes)` na seção de rotas, antes do middleware 404.

### 7. (Opcional) Criar middleware de validação

Se a entidade tiver campos obrigatórios específicos, criar função em `validarCampos.middleware.js` seguindo o padrão de `validarCadastro`/`validarLogin`.

## Convenções do projeto

- **Idioma**: Comentários e mensagens de erro em Português (BR)
- **Módulos**: ES Modules (`import`/`export`)
- **Erros**: Usar `criarErro(mensagem, status)` nunca `new Error()` direto
- **Senhas**: Nunca retornar `senhaHash` em respostas; usar `select: false` no Schema
- **Autenticação**: Middleware `autenticar` para rotas protegidas
- **Respostas**: Sempre `{ entidade }` ou `{ entidades }` como wrapper no JSON

## Referências no projeto

- Boilerplate exemplar: `Projeto_Final/src/models/usuario.model.js` (e camadas seguintes)
- Plano de ação: `Projeto_Final/arquivos_de_orientacao/Plano_de_Acao_PresencaFacil.md`
- Entidades a criar: Disciplina, Semestre, Aluno, Professor, Turma, Aula, TokenPresenca, Presenca
