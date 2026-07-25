# PresençaFácil - Plano de Ação

## Dados do Projeto
- **Nome:** PresençaFácil - Sistema de Lista de Presença
- **Prazo:** 30/07/2026 (16 dias)
- **Escopo atual:** Backend completo
- **Equipe:** 4 integrantes

---

## Divisão de Papéis - Modelo 1: Por Área Lógica

| Integrante | Entidades | Responsabilidades |
|------------|-----------|-------------------|
| **Int.1** | Disciplina, Semestre | Estrutura acadêmica (base do sistema) |
| **Int.2** | Aluno, Professor | Pessoas + geração automática de RA |
| **Int.3** | Turma, Aula | Gestão de turmas e aulas |
| **Int.4 (Líder)** | TokenPresenca, Presenca | QR Code, validação, integração, deploy |

---

## Cronograma (16 dias)

### Semana 1: 14/07 a 20/07

| Dia | Data | Int.1 | Int.2 | Int.3 | Int.4 |
|-----|------|-------|-------|-------|-------|
| 1 | 14/07 | Disciplina model/repo | Aluno model/repo | - | Configuração inicial |
| 2 | 15/07 | Disciplina service/ctrl/routes | Aluno service/ctrl/routes | - | TokenPresenca model/repo |
| 3 | 16/07 | Semestre model/repo | Professor model/repo | Turma model/repo | TokenPresenca service/ctrl/routes |
| 4 | 17/07 | Semestre service/ctrl/routes | Professor service/ctrl/routes | Turma service/ctrl/routes | Presenca model/repo |
| 5 | 18/07 | Testar CRUD | Testar CRUD + RA | Aula model/repo | Presenca service/ctrl/routes |
| 6 | 19/07 | Intregar no app.js | Integrar no app.js | Aula service/ctrl/routes | Rotas de fluxo |
| 7 | 20/07 | - | - | Integrar no app.js | Testes integração |

### Semana 2: 21/07 a 27/07

| Dia | Data | Atividade |
|-----|------|-----------|
| 8-10 | 21-23/07 | Testes individuais + correção de bugs |
| 11-12 | 24-25/07 | Integração geral + testes no Postman |
| 13-14 | 26-27/07 | Correções finais + preparação deploy |

### Dias extras: 28/07 a 30/07

| Dia | Data | Atividade |
|-----|------|-----------|
| 15 | 28/07 | Deploy backend no Render |
| 16 | 29/07 | README + documentação |
| 17 | 30/07 | Revisão final + entrega |

---

## Fluxo de Trabalho

### Para cada integrante:
1. Clonar o boilerplate
2. Criar os 5 arquivos da entidade (model → repo → service → controller → routes)
3. Testar no Postman
4. Integrar no app.js

### Ordem de dependência:
```
Int.1 (Disciplina, Semestre) ─┐
                               ├→ Int.3 (Turma, Aula) ─→ Int.4 (TokenPresenca, Presenca)
Int.2 (Aluno, Professor) ────┘
```

---

## Entidades do Sistema (8 total)

| Entidade | Integrante | Campos Principais |
|----------|------------|-------------------|
| Disciplina | Int.1 | nome, codigo, cargaHoraria |
| Semestre | Int.1 | ano, periodo |
| Aluno | Int.2 | ra (auto), nome, email, senha, curso |
| Professor | Int.2 | nome, email, senha, disciplina |
| Turma | Int.3 | nome, horario, disciplina, professor, alunos |
| Aula | Int.3 | data, horario, status, turma |
| TokenPresenca | Int.4 | codigo, codigoManual, aula, expiraEm, usado |
| Presenca | Int.4 | aluno, aula, tokenUsado, dataHoraCheckin, status |

---

## Rotas de Fluxo (obrigatório mínimo 1)

| Rota | Descrição | Integrante |
|------|-----------|------------|
| POST /api/aulas/:id/abrir | Abrir lista + gerar QR Code | Int.4 |
| PATCH /api/aulas/:id/fechar | Fechar lista | Int.4 |
| POST /api/presencas | Registrar presença (validar token) | Int.4 |
| GET /api/presencas/relatorio/:turmaId | Relatório de frequência | Int.4 |

---

## Tecnologias Adicionais

| Biblioteca | Uso |
|------------|-----|
| qrcode | Gerar imagem do QR Code |
| crypto | Gerar código manual (nativo) |

---

## Checklist de Entrega Backend

- [ ] 8 entidades criadas (Disciplina, Semestre, Aluno, Professor, Turma, Aula, TokenPresenca, Presenca)
- [ ] CRUD completo para todas as entidades
- [ ] Autenticação JWT funcionando
- [ ] RA automático para alunos
- [ ] QR Code gerando corretamente
- [ ] Validação de token (expiração 5min, duplicidade)
- [ ] Rotas de fluxo funcionando
- [ ] Todos os testes no Postman aprovados
- [ ] Backend deployado no Render
- [ ] README completo

---

## Próximos Passos (após backend)

1. Frontend (React ou FlutterFlow)
2. Integração frontend com API
3. Deploy frontend no Render
4. Documentação final
5. Apresentação
