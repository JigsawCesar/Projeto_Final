import TurmaService from "../services/turma.service.js";

async function criar(req, res, next) {
  try {
    const turma = await TurmaService.criar(req.body);
    return res.status(201).json({ turma });
  } catch (error) {
    return next(error);
  };
};

async function listar(req, res, next) {
  try {
    const turmas = await TurmaService.listar_todas(req.usuario);
    return res.status(200).json({ turmas });
  } catch (error) {
    return next(error);
  };
};

async function buscar_por_id(req, res, next) {
  try {
    const turma = await TurmaService.buscar_por_id(req.params.id);
    return res.status(200).json({ turma });
  } catch (error) {
    return next(error);
  };
};

async function atualizar(req, res, next) {
  try {
    const turma = await TurmaService.atualizar(req.params.id, req.body);
    return res.status(200).json({ turma });
  } catch (error) {
    return next(error);
  };
};

async function deletar(req, res, next) {
  try {
    const resultado = await TurmaService.deletar(req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  };
};

async function matricular(req, res, next) {
  try {
    const turma = await TurmaService.matricular(req.params.id, req.body.aluno_id);
    return res.status(200).json({ turma });
  } catch (error) {
    return next(error);
  };
};

async function desmatricular(req, res, next) {
  try {
    const turma = await TurmaService.desmatricular(req.params.id, req.params.aluno_id);
    return res.status(200).json({ turma });
  } catch (error) {
    return next(error);
  };
};

const TurmaController = {
  criar,
  listar,
  buscar_por_id,
  atualizar,
  deletar,
  matricular,
  desmatricular,
};

export default TurmaController;
