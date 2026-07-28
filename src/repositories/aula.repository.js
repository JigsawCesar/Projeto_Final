import Aula from "../models/aula.model.js";

const POPULATE = {
  path: "turma",
  select: "nome horario disciplina professor semestre",
};

async function criar(dados) {
  return Aula.create(dados);
};

async function buscar_por_id(id) {
  return Aula.findById(id).populate(POPULATE);
};

async function listar_todos() {
  return Aula.find().sort({ data: -1 }).populate(POPULATE);
};

async function listar_por_turma(turma_id) {
  return Aula.find({ turma: turma_id }).sort({ data: -1 }).populate(POPULATE);
};

async function listar_por_turmas(turma_ids) {
  return Aula.find({ turma: { $in: turma_ids } }).sort({ data: -1 }).populate(POPULATE);
};

async function atualizar_por_id(id, dados_atualizados) {
  return Aula.findByIdAndUpdate(id, dados_atualizados, {
    new: true,
    runValidators: true,
  }).populate(POPULATE);
};

async function deletar_por_id(id) {
  return Aula.findByIdAndDelete(id);
};

const AulaRepository = {
  criar,
  buscar_por_id,
  listar_todos,
  listar_por_turma,
  listar_por_turmas,
  atualizar_por_id,
  deletar_por_id,
};

export default AulaRepository;
