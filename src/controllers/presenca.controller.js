import PresencaService from "../services/presenca.service.js";
import criar_erro from "../utils/criar_erro.js";

async function registrar(req, res, next) {
  try {
    // Aluno só registra a própria presença; admin/professor registram em nome de um aluno (checagem manual/apoio).
    const aluno_id = req.usuario.tipo === "aluno" ? req.usuario.id : req.body.aluno_id;

    if (!aluno_id) {
      throw criar_erro("Informe o aluno (aluno_id).", 400);
    };

    const presenca = await PresencaService.registrar(aluno_id, req.body.codigo);
    return res.status(201).json({ presenca });
  } catch (error) {
    return next(error);
  };
};

async function listar(req, res, next) {
  try {
    const presencas = await PresencaService.listar_todas();
    return res.status(200).json({ presencas });
  } catch (error) {
    return next(error);
  };
};

async function listar_por_aluno(req, res, next) {
  try {
    if (req.usuario.tipo === "aluno" && req.usuario.id !== req.params.aluno_id) {
      throw criar_erro("Você só pode ver o próprio histórico de presenças.", 403);
    };

    const presencas = await PresencaService.listar_por_aluno(req.params.aluno_id);
    return res.status(200).json({ presencas });
  } catch (error) {
    return next(error);
  };
};

async function minha_frequencia(req, res, next) {
  try {
    const relatorio = await PresencaService.minha_frequencia(req.usuario.id);
    return res.status(200).json(relatorio);
  } catch (error) {
    return next(error);
  };
};

async function relatorio_por_turma(req, res, next) {
  try {
    const relatorio = await PresencaService.relatorio_por_turma(req.params.turma_id, req.usuario);
    return res.status(200).json(relatorio);
  } catch (error) {
    return next(error);
  };
};

async function deletar(req, res, next) {
  try {
    const resultado = await PresencaService.deletar(req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  };
};

const PresencaController = {
  registrar,
  listar,
  listar_por_aluno,
  relatorio_por_turma,
  minha_frequencia,
  deletar,
};

export default PresencaController;
