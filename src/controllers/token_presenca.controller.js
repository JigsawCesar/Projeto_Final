import TokenPresencaService from "../services/token_presenca.service.js";

async function criar(req, res, next) {
  try {
    const token = await TokenPresencaService.criar(req.body);
    return res.status(201).json(token);
  } catch (error) {
    return res.status(error.status || 500).json({ erro: error.message });
  }
}

async function buscar_por_id(req, res, next) {
  try {
    const token = await TokenPresencaService.buscar_por_id(req.params.id);
    return res.status(200).json(token);
  } catch (error) {
    return res.status(error.status || 500).json({ erro: error.message });
  }
}

async function listar(req, res, next) {
  try {
    const tokens = await TokenPresencaService.listar_todos();
    return res.status(200).json(tokens);
  } catch (error) {
    return res.status(error.status || 500).json({ erro: error.message });
  }
}

async function listar_por_aula(req, res, next) {
  try {
    const tokens = await TokenPresencaService.listar_por_aula(req.params.aula_id);
    return res.status(200).json(tokens);
  } catch (error) {
    return res.status(error.status || 500).json({ erro: error.message });
  }
}

async function validar(req, res, next) {
  try {
    const codigo = req.body.codigo || req.query.codigo;
    const token = await TokenPresencaService.validar(codigo);
    return res.status(200).json(token);
  } catch (error) {
    return res.status(error.status || 500).json({ erro: error.message });
  }
}

async function deletar(req, res, next) {
  try {
    const resultado = await TokenPresencaService.deletar(req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(error.status || 500).json({ erro: error.message });
  }
}

const TokenPresencaController = {
  criar,
  buscar_por_id,
  listar,
  listar_por_aula,
  validar,
  deletar,
};

export default TokenPresencaController;