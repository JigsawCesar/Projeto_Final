import TurmaRepository from "../repositories/turma.repository.js";
import DisciplinaRepository from "../repositories/disciplina.repository.js";
import ProfessorRepository from "../repositories/professor.repository.js";
import SemestreRepository from "../repositories/semestre.repository.js";
import AlunoRepository from "../repositories/aluno.repository.js";
import criar_erro from "../utils/criar_erro.js";

async function validar_relacionados(dados) {
  if (dados.disciplina) {
    const disciplina = await DisciplinaRepository.buscar_por_id(dados.disciplina);
    if (!disciplina) {
      throw criar_erro("Disciplina informada não encontrada.", 400);
    };
  };

  if (dados.professor) {
    const professor = await ProfessorRepository.buscarPorId(dados.professor);
    if (!professor) {
      throw criar_erro("Professor informado não encontrado.", 400);
    };
  };

  if (dados.semestre) {
    const semestre = await SemestreRepository.buscar_por_id(dados.semestre);
    if (!semestre) {
      throw criar_erro("Semestre informado não encontrado.", 400);
    };
  };
};

async function criar(dados) {
  await validar_relacionados(dados);

  return TurmaRepository.criar({
    nome: dados.nome?.trim(),
    horario: dados.horario?.trim(),
    disciplina: dados.disciplina,
    professor: dados.professor,
    semestre: dados.semestre,
    alunos: dados.alunos ?? [],
  });
};

async function buscar_por_id(id) {
  const turma = await TurmaRepository.buscar_por_id(id);

  if (!turma) {
    throw criar_erro("Turma não encontrada.", 404);
  };

  return turma;
};

// RN-005: professor só gerencia as turmas em que ele é o responsável; admin vê todas.
async function listar_todas(usuario) {
  if (usuario?.tipo === "professor") {
    return TurmaRepository.listar_por_professor(usuario.id);
  };

  return TurmaRepository.listar_todos();
};

async function atualizar(id, dados) {
  const turma = await TurmaRepository.buscar_por_id(id);

  if (!turma) {
    throw criar_erro("Turma não encontrada.", 404);
  };

  await validar_relacionados(dados);

  if (dados.nome) dados.nome = dados.nome.trim();
  if (dados.horario) dados.horario = dados.horario.trim();

  return TurmaRepository.atualizar_por_id(id, dados);
};

async function deletar(id) {
  const turma = await TurmaRepository.deletar_por_id(id);

  if (!turma) {
    throw criar_erro("Turma não encontrada.", 404);
  };

  return { message: "Turma removida com sucesso!" };
};

async function matricular(turma_id, aluno_id) {
  const turma = await TurmaRepository.buscar_por_id(turma_id);

  if (!turma) {
    throw criar_erro("Turma não encontrada.", 404);
  };

  const aluno = await AlunoRepository.buscarPorId(aluno_id);

  if (!aluno) {
    throw criar_erro("Aluno informado não encontrado.", 400);
  };

  const jaMatriculado = turma.alunos.some((a) => a._id.toString() === aluno_id);

  if (jaMatriculado) {
    throw criar_erro("Aluno já está matriculado nesta turma.", 400);
  };

  return TurmaRepository.atualizar_por_id(turma_id, {
    $push: { alunos: aluno_id },
  });
};

async function desmatricular(turma_id, aluno_id) {
  const turma = await TurmaRepository.buscar_por_id(turma_id);

  if (!turma) {
    throw criar_erro("Turma não encontrada.", 404);
  };

  return TurmaRepository.atualizar_por_id(turma_id, {
    $pull: { alunos: aluno_id },
  });
};

const TurmaService = {
  criar,
  buscar_por_id,
  listar_todas,
  atualizar,
  deletar,
  matricular,
  desmatricular,
};

export default TurmaService;
