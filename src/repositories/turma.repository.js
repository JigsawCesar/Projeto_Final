import Turma from "../models/turma.model.js";

const POPULATE = [
  { path: "disciplina", select: "nome codigo carga_horaria" },
  { path: "professor", select: "nome email foto" },
  { path: "semestre", select: "ano periodo" },
  { path: "alunos", select: "nome email foto" },
];

async function criar(dados) {
  return Turma.create(dados);
};

async function buscar_por_id(id) {
  return Turma.findById(id).populate(POPULATE);
};

async function listar_todos() {
  return Turma.find().sort({ createdAt: -1 }).populate(POPULATE);
};

async function listar_por_professor(professor_id) {
  return Turma.find({ professor: professor_id }).sort({ createdAt: -1 }).populate(POPULATE);
};

async function listar_por_aluno(aluno_id) {
  return Turma.find({ alunos: aluno_id }).sort({ createdAt: -1 }).populate(POPULATE);
};

async function atualizar_por_id(id, dados_atualizados) {
  return Turma.findByIdAndUpdate(id, dados_atualizados, {
    new: true,
    runValidators: true,
  }).populate(POPULATE);
};

async function deletar_por_id(id) {
  return Turma.findByIdAndDelete(id);
};

const TurmaRepository = {
  criar,
  buscar_por_id,
  listar_todos,
  listar_por_professor,
  listar_por_aluno,
  atualizar_por_id,
  deletar_por_id,
};

export default TurmaRepository;
