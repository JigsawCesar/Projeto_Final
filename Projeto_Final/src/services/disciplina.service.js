import DisciplinaRepository from "../repositories/disciplina.repository.js";
import criar_erro from "../utils/criar_erro.js";

async function criar(dados) {

  const existente = await DisciplinaRepository.buscar_por_codigo(dados.codigo);

  if (existente) {
    throw criar_erro("Já existe uma disciplina com este código.", 400);
  };

  return DisciplinaRepository.criar({
    nome: dados.nome.trim(),
    codigo: dados.codigo.trim().toUpperCase(),
    carga_horaria: Number(dados.carga_horaria)
  });
};

async function buscar_por_id(id) {

  const disciplina = await DisciplinaRepository.buscar_por_id(id);

  if (!disciplina) {
    throw criar_erro("Disciplina não encontrada.", 404);
  };

  return disciplina;
};

async function listar_todas() {
  return DisciplinaRepository.listar_todos();
};

async function atualizar(id, dados) {

  if (!dados || Object.keys(dados).length === 0) {
    throw cria_erro("Envie pelo menos um campo para atualizar.", 400);
  };

  const disciplina = await DisciplinaRepository.buscar_por_id(id);

  if (!disciplina) {
    throw criar_erro("Disciplina não encontrada.", 404);
  };

  if (dados.codigo) {
    const existente = await DisciplinaRepository.buscar_por_codigo(dados.codigo);

    if (existente && existente._id.toString() !== id) {
      throw criar_erro("Já existe uma disciplina com este código.", 400);
    };

    dados.codigo = dados.codigo.trim().toUpperCase();
  };

  if (dados.nome) {
    dados.nome = dados.nome.trim();
  };
  
  if (dados.carga_horaria) {
    dados.carga_horaria = Number(dados.carga_horaria);
  };
  
  return DisciplinaRepository.atualizar_por_id(id, dados);
};

async function deletar(id) {
  const disciplina = await DisciplinaRepository.deletar_por_id(id);

  if (!disciplina) {
    throw criar_erro("Disciplina não encontrada.", 404);
  };
  return { message: "Disciplina removida com sucesso!" };
};

const DisciplinaService = {
  criar,
  buscar_por_id,
  listar_todas,
  atualizar,
  deletar,
};

export default DisciplinaService;