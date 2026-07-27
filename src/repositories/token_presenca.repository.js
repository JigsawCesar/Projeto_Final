import TokenPresenca from "../models/token_presenca.model.js";

async function criar(dados) {
    return TokenPresenca.create(dados);
};

async function buscar_por_codigo(codigo) {
  return TokenPresenca.findOne({ codigo: codigo.trim().toUpperCase() });
};

async function buscar_por_id(id) {
  return TokenPresenca.findById(id);
};

async function listar_por_aula(aula_id) {
  return TokenPresenca.find({ aula: aula_id }).sort({ createdAt: -1 });
};

async function listar_todos() {
  return TokenPresenca.find().sort({ createdAt: -1 });
};

async function atualizar_por_id(id, dados_atualizados) {
  return TokenPresenca.findByIdAndUpdate(id, dados_atualizados, {
    new: true,
    runValidators: true,
  });
};

async function deletar_por_id(id) {
  return TokenPresenca.findByIdAndDelete(id);
};

const TokenPresencaRepository = {
  criar,
  buscar_por_codigo,
  buscar_por_id,
  listar_por_aula,
  listar_todos,
  atualizar_por_id,
  deletar_por_id,
};

export default TokenPresencaRepository;