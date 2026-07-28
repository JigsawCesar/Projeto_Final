import AulaService from "../services/aula.service.js";

async function criar(req, res, next) {
  try {
    const aula = await AulaService.criar(req.body);
    return res.status(201).json({ aula });
  } catch (error) {
    return next(error);
  };
};

async function listar(req, res, next) {
  try {
    const aulas = await AulaService.listar_todas(req.usuario);
    return res.status(200).json({ aulas });
  } catch (error) {
    return next(error);
  };
};

async function listar_por_turma(req, res, next) {
  try {
    const aulas = await AulaService.listar_por_turma(req.params.turma_id);
    return res.status(200).json({ aulas });
  } catch (error) {
    return next(error);
  };
};

async function buscar_por_id(req, res, next) {
  try {
    const aula = await AulaService.buscar_por_id(req.params.id);
    return res.status(200).json({ aula });
  } catch (error) {
    return next(error);
  };
};

async function atualizar(req, res, next) {
  try {
    const aula = await AulaService.atualizar(req.params.id, req.body);
    return res.status(200).json({ aula });
  } catch (error) {
    return next(error);
  };
};

async function deletar(req, res, next) {
  try {
    const resultado = await AulaService.deletar(req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  };
};

async function abrir(req, res, next) {
  try {
    const resultado = await AulaService.abrir(req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  };
};

async function fechar(req, res, next) {
  try {
    const aula = await AulaService.fechar(req.params.id);
    return res.status(200).json({ aula });
  } catch (error) {
    return next(error);
  };
};

const AulaController = {
  criar,
  listar,
  listar_por_turma,
  buscar_por_id,
  atualizar,
  deletar,
  abrir,
  fechar,
};

export default AulaController;
