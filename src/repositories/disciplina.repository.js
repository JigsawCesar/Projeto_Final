import Disciplina from "../models/disciplina.model.js";

async function criar(dados) {
    return Disciplina.create(dados);
};

async function buscar_por_codigo(codigo) {
  return Disciplina.findOne({ codigo: codigo.trim().toUpperCase() });
};

async function buscar_por_id(id) {
  return Disciplina.findById(id);
};

async function listar_todos() {
  return Disciplina.find().sort({ createdAt: -1 });
};

async function atualizar_por_id(id, dados_atualizados) {
  return Disciplina.findByIdAndUpdate(id, dados_atualizados, {
    new: true,
    runValidators: true,
  });
};

async function deletar_por_id(id) {
  return Disciplina.findByIdAndDelete(id);
};

const DisciplinaRepository = {
  criar,
  buscar_por_codigo,
  buscar_por_id,
  listar_todos,
  atualizar_por_id,
  deletar_por_id,
};

export default DisciplinaRepository;