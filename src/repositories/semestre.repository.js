import Semestre from "../models/semestre.model.js";

async function criar(dados) {
    return Semestre.create(dados);
};

async function buscar_por_ano_periodo(ano, periodo) {
  return Semestre.findOne({ ano: ano, periodo: periodo.trim() });
};

async function buscar_por_id(id) {
  return Semestre.findById(id);
};

async function listar_todos() {
  return Semestre.find().sort({ createdAt: -1 });
};

async function atualizar_por_id(id, dados_atualizados) {
  return Semestre.findByIdAndUpdate(id, dados_atualizados, {
    new: true,
    runValidators: true,
  });
};

async function deletar_por_id(id) {
  return Semestre.findByIdAndDelete(id);
};

const SemestreRepository = {
  criar,
  buscar_por_ano_periodo,
  buscar_por_id,
  listar_todos,
  atualizar_por_id,
  deletar_por_id,
};

export default SemestreRepository;