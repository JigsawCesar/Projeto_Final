import DisciplinaService from "../services/disciplina.service.js";

async function criar(req, res, next) {
  try {
    const disciplina = await DisciplinaService.criar(req.body);
    return res.status(201).json({ disciplina });
  } catch (error) {
    return next(error);
  };
};

async function buscar_por_id(req, res, next) {
  try {
    const disciplina = await DisciplinaService.buscar_por_id(req.params.id);
    return res.status(200).json({ disciplina });
  } catch (error) {
    return next(error);
  };
};

async function listar(req, res, next) {
  try {
    const disciplinas = await DisciplinaService.listarTodas();
    return res.status(200).json({ disciplinas });
  } catch (error) {
    return next(error);
  };
};

async function atualizar(req, res, next) {
  try {
    const disciplina = await DisciplinaService.atualizar(req.params.id, req.body);
    return res.status(200).json({ disciplina });
  } catch (error) {
    return next(error);
  };
};

async function deletar(req, res, next) {
  try {
    const resultado = await DisciplinaService.deletar(req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  };
};

const DisciplinaController = {
  criar,
  buscar_por_id,
  listar,
  atualizar,
  deletar,
};

export default DisciplinaController;