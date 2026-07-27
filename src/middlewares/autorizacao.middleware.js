import criarErro from "../utils/criar_erro.js";

function normalizarTipo(tipo) {
  if (typeof tipo !== "string") {
    return null;
  }

  return tipo.trim().toLowerCase();
}

function autorizar(tiposPermitidos = []) {
  const tipos = Array.isArray(tiposPermitidos)
    ? tiposPermitidos
    : [tiposPermitidos];

  const tiposNormalizados = tipos
    .map(normalizarTipo)
    .filter(Boolean);

  return function verificarPermissao(req, res, next) {
    if (!req.usuario) {
      return next(criarErro("Usuário não autenticado.", 401));
    }

    const tipoUsuario = normalizarTipo(
      req.usuario.tipo || req.usuario.role || req.usuario.perfil || req.usuario.userType
    );

    if (!tipoUsuario) {
      return next(criarErro("Tipo de usuário não encontrado no token.", 401));
    }

    if (!tiposNormalizados.includes(tipoUsuario)) {
      return next(criarErro("Acesso negado. Você não tem permissão para esta ação.", 403));
    }

    return next();
  };
}

export default autorizar;
