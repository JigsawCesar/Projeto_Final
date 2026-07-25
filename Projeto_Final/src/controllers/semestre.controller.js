import SemestreService from "../services/semestre.service.js";

async function criar(req, res, next) {
  try {
    const semestre = await SemestreService.criar(req.body);
    return res.status(201).json({ semestre });
  } catch (error) {
    return next(error);
  };
};

async function buscar_por_id(req, res, next) {
  try {
    const semestre = await SemestreService.buscar_por_id(req.params.id);
    return res.status(200).json({ semestre });
  } catch (error) {
    return next(error);
  };
};

async function listar(req, res, next) {
  try {
    const semestres = await SemestreService.listar_todos();
    return res.status(200).json({ semestres });
  } catch (error) {
    return next(error);
  };
};

async function atualizar(req, res, next) {
  try {
    const semestre = await SemestreService.atualizar(req.params.id, req.body);
    return res.status(200).json({ semestre });
  } catch (error) {
    return next(error);
  };
};

async function deletar(req, res, next) {
  try {
    const resultado = await SemestreService.deletar(req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  };
};

const SemestreController = {
  criar,
  buscar_por_id,
  listar,
  atualizar,
  deletar,
};

export default SemestreController;