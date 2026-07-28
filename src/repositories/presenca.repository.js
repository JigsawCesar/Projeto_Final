import Presenca from "../models/presenca.model.js";

async function criar(dados) {
  return Presenca.create(dados);
};

async function buscar_por_id(id) {
  return Presenca.findById(id).populate("aluno aula");
};

async function listar_todos() {
  return Presenca.find().sort({ data_registro: -1 }).populate("aluno aula");
};

async function listar_por_aluno(aluno_id) {
  return Presenca.find({ aluno: aluno_id }).sort({ data_registro: -1 }).populate("aula");
};

async function listar_por_aula(aula_id) {
  return Presenca.find({ aula: aula_id }).populate("aluno");
};

async function buscar_por_aluno_e_aula(aluno_id, aula_id) {
  return Presenca.findOne({ aluno: aluno_id, aula: aula_id });
};

async function deletar_por_id(id) {
  return Presenca.findByIdAndDelete(id);
};

const PresencaRepository = {
  criar,
  buscar_por_id,
  listar_todos,
  listar_por_aluno,
  listar_por_aula,
  buscar_por_aluno_e_aula,
  deletar_por_id,
};

export default PresencaRepository;
