import SemestreRepository from "../repositories/semestre.repository.js";
import criar_erro from "../utils/criar_erro.js";

async function criar(dados) {
  const existente = await SemestreRepository.buscar_por_ano_periodo(dados.ano, dados.periodo);
  if (existente) {
    throw criar_erro("Já existe um semestre com este ano e período.", 400);
  };

  return SemestreRepository.criar({
    ano: Number(dados.ano),
    periodo: dados.periodo.trim()
  });
};

async function buscar_por_id(id) {
  const semestre = await SemestreRepository.buscar_por_id(id);
  if (!semestre) {
    throw criar_erro("Semestre não encontrado.", 404);
  };
  return semestre;
};

async function listar_todos() {
  return SemestreRepository.listar_todos();
};

async function atualizar(id, dados) {
  if (!dados || Object.keys(dados).length === 0) {
    throw criar_erro("Envie pelo menos um campo para atualizar.", 400);
  };
  const semestre = await SemestreRepository.buscar_por_id(id);
  if (!semestre) {
    throw criar_erro("Semestre não encontrado.", 404);
  };
  if (dados.ano && dados.periodo) {
    const existente = await SemestreRepository.buscar_por_ano_periodo(dados.ano, dados.periodo);
    if (existente && existente._id.toString() !== id) {
      throw criar_erro("Já existe um semestre com este ano e período.", 400);
    };
  };
  if (dados.periodo) {
    dados.periodo = dados.periodo.trim();
  };
  if (dados.ano) {
    dados.ano = Number(dados.ano);
  };
  return SemestreRepository.atualizar_por_id(id, dados);
};

async function deletar(id) {
  const semestre = await SemestreRepository.deletar_por_id(id);
  if (!semestre) {
    throw criar_erro("Semestre não encontrado.", 404);
  };
  return { message: "Semestre removido com sucesso!" };
};

const SemestreService = {
  criar,
  buscar_por_id,
  listar_todos,
  atualizar,
  deletar,
};

export default SemestreService;