import AulaRepository from "../repositories/aula.repository.js";
import TurmaRepository from "../repositories/turma.repository.js";
import TokenPresencaService from "./token_presenca.service.js";
import TokenPresencaRepository from "../repositories/token_presenca.repository.js";
import criar_erro from "../utils/criar_erro.js";

async function criar(dados) {
  const turma = await TurmaRepository.buscar_por_id(dados.turma);

  if (!turma) {
    throw criar_erro("Turma informada não encontrada.", 400);
  };

  return AulaRepository.criar({
    turma: dados.turma,
    data: dados.data,
    horario: dados.horario?.trim(),
  });
};

async function buscar_por_id(id) {
  const aula = await AulaRepository.buscar_por_id(id);

  if (!aula) {
    throw criar_erro("Aula não encontrada.", 404);
  };

  return aula;
};

// RN-005: professor só vê as aulas das turmas em que ele é responsável; admin vê todas.
async function listar_todas(usuario) {
  if (usuario?.tipo === "professor") {
    const turmas = await TurmaRepository.listar_por_professor(usuario.id);
    const turma_ids = turmas.map((t) => t._id);
    return AulaRepository.listar_por_turmas(turma_ids);
  };

  return AulaRepository.listar_todos();
};

async function listar_por_turma(turma_id) {
  return AulaRepository.listar_por_turma(turma_id);
};

async function atualizar(id, dados) {
  const aula = await AulaRepository.buscar_por_id(id);

  if (!aula) {
    throw criar_erro("Aula não encontrada.", 404);
  };

  if (dados.turma) {
    const turma = await TurmaRepository.buscar_por_id(dados.turma);

    if (!turma) {
      throw criar_erro("Turma informada não encontrada.", 400);
    };
  };

  if (dados.horario) dados.horario = dados.horario.trim();

  return AulaRepository.atualizar_por_id(id, dados);
};

async function deletar(id) {
  const aula = await AulaRepository.deletar_por_id(id);

  if (!aula) {
    throw criar_erro("Aula não encontrada.", 404);
  };

  return { message: "Aula removida com sucesso!" };
};

// RF-006/RF-016: abrir a lista de presença gera o token + QR Code da aula.
async function abrir(id) {
  const aula = await AulaRepository.buscar_por_id(id);

  if (!aula) {
    throw criar_erro("Aula não encontrada.", 404);
  };

  if (aula.status === "aberta") {
    throw criar_erro("Esta aula já está com a lista de presença aberta.", 400);
  };

  const token = await TokenPresencaService.criar({ aula: id });
  const aula_atualizada = await AulaRepository.atualizar_por_id(id, { status: "aberta" });

  return { aula: aula_atualizada, token };
};

// RF-007/RN-007: fechar a aula invalida qualquer token ainda ativo.
async function fechar(id) {
  const aula = await AulaRepository.buscar_por_id(id);

  if (!aula) {
    throw criar_erro("Aula não encontrada.", 404);
  };

  if (aula.status === "fechada") {
    throw criar_erro("Esta aula já está fechada.", 400);
  };

  const tokens = await TokenPresencaRepository.listar_por_aula(id);

  await Promise.all(
    tokens
      .filter((token) => token.ativo)
      .map((token) => TokenPresencaRepository.atualizar_por_id(token._id, { ativo: false })),
  );

  const aula_atualizada = await AulaRepository.atualizar_por_id(id, { status: "fechada" });

  return aula_atualizada;
};

const AulaService = {
  criar,
  buscar_por_id,
  listar_todas,
  listar_por_turma,
  atualizar,
  deletar,
  abrir,
  fechar,
};

export default AulaService;
