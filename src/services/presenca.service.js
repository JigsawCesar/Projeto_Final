import PresencaRepository from "../repositories/presenca.repository.js";
import TokenPresencaRepository from "../repositories/token_presenca.repository.js";
import TurmaRepository from "../repositories/turma.repository.js";
import AulaRepository from "../repositories/aula.repository.js";
import criar_erro from "../utils/criar_erro.js";

// RF-009/RF-021: valida o token (QR Code ou código manual) e registra a presença do aluno.
async function registrar(aluno_id, codigo) {
  if (!aluno_id) {
    throw criar_erro("Aluno é obrigatório.", 400);
  };

  if (!codigo) {
    throw criar_erro("Código é obrigatório.", 400);
  };

  const token = await TokenPresencaRepository.buscar_por_codigo(codigo);

  if (!token) {
    throw criar_erro("Token inválido.", 400);
  };

  if (!token.ativo) {
    throw criar_erro("Token já foi utilizado.", 400);
  };

  if (new Date() > token.data_expiracao) {
    throw criar_erro("Token expirado.", 400);
  };

  // RN-001: aluno só pode registrar presença uma vez por aula.
  const jaRegistrado = await PresencaRepository.buscar_por_aluno_e_aula(aluno_id, token.aula);

  if (jaRegistrado) {
    throw criar_erro("Este aluno já registrou presença nesta aula.", 400);
  };

  // Uso único do token (RN-010).
  await TokenPresencaRepository.atualizar_por_id(token._id, { ativo: false });

  return PresencaRepository.criar({
    aluno: aluno_id,
    aula: token.aula,
    token: token._id,
    status: "presente",
  });
};

async function listar_todas() {
  return PresencaRepository.listar_todos();
};

async function listar_por_aluno(aluno_id) {
  return PresencaRepository.listar_por_aluno(aluno_id);
};

// RF-012/RF-013: relatório de frequência por turma, com % de presença de cada aluno matriculado.
async function relatorio_por_turma(turma_id, usuario) {
  const turma = await TurmaRepository.buscar_por_id(turma_id);

  if (!turma) {
    throw criar_erro("Turma não encontrada.", 404);
  };

  // RN-005: professor só vê o relatório das turmas em que é responsável.
  if (usuario?.tipo === "professor" && turma.professor?._id?.toString() !== usuario.id) {
    throw criar_erro("Você não é responsável por esta turma.", 403);
  };

  const aulas = await AulaRepository.listar_por_turma(turma_id);
  const totalAulas = aulas.length;

  const presencasPorAula = await Promise.all(
    aulas.map((aula) => PresencaRepository.listar_por_aula(aula._id)),
  );

  const presencasPorAluno = {};

  presencasPorAula.flat().forEach((presenca) => {
    const alunoId = presenca.aluno._id.toString();
    presencasPorAluno[alunoId] = (presencasPorAluno[alunoId] ?? 0) + 1;
  });

  const relatorio = (turma.alunos ?? []).map((aluno) => {
    const alunoId = aluno._id.toString();
    const presencas = presencasPorAluno[alunoId] ?? 0;

    return {
      aluno,
      totalAulas,
      presencas,
      percentual: totalAulas > 0 ? Math.round((presencas / totalAulas) * 100) : 0,
    };
  });

  return { turma, totalAulas, relatorio };
};

// RF-013: dashboard de frequência do próprio aluno, com % de presença e faltas por turma.
async function minha_frequencia(aluno_id) {
  const turmas = await TurmaRepository.listar_por_aluno(aluno_id);

  const relatorio = await Promise.all(
    turmas.map(async (turma) => {
      const aulas = await AulaRepository.listar_por_turma(turma._id);
      const totalAulas = aulas.length;
      const aulaIds = aulas.map((aula) => aula._id);
      const presencas = await PresencaRepository.contar_por_aluno_e_aulas(aluno_id, aulaIds);
      const faltas = totalAulas - presencas;

      return {
        turma,
        totalAulas,
        presencas,
        faltas,
        percentual: totalAulas > 0 ? Math.round((presencas / totalAulas) * 100) : 0,
      };
    }),
  );

  return { relatorio };
};

async function deletar(id) {
  const presenca = await PresencaRepository.deletar_por_id(id);

  if (!presenca) {
    throw criar_erro("Presença não encontrada.", 404);
  };

  return { message: "Presença removida com sucesso!" };
};

const PresencaService = {
  registrar,
  listar_todas,
  listar_por_aluno,
  relatorio_por_turma,
  minha_frequencia,
  deletar,
};

export default PresencaService;
