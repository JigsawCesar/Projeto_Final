import TokenPresencaRepository from "../repositories/token_presenca.repository.js";
import criar_erro from "../utils/criar_erro.js";
import crypto from "crypto";
import QRCode from "qrcode";
async function criar(dados) {
  
  if (!dados.aula) {
    throw criar_erro("A aula é obrigatória!", 400);
  };

  // Gera código aleatório de 6 caracteres
  const codigo = crypto.randomBytes(3).toString("hex").toUpperCase();
  // Gera QR Code com o código
  const qr_code = await QRCode.toDataURL(codigo);
  // Token expira em 5 minutos
  const data_expiracao = new Date(Date.now() + 5 * 60 * 1000);
  return TokenPresencaRepository.criar({
    aula: dados.aula,
    codigo: codigo,
    qr_code: qr_code,
    ativo: true,
    data_expiracao: data_expiracao
  });
};

async function buscar_por_id(id) {
  const token = await TokenPresencaRepository.buscar_por_id(id);
  if (!token) {
    throw criar_erro("Token não encontrado.", 404);
  };
  return token;
};

async function listar_por_aula(aula_id) {
  return TokenPresencaRepository.listar_por_aula(aula_id);
};

async function listar_todos() {
  return TokenPresencaRepository.listar_todos();
};

async function validar(codigo) {
  
  const token = await TokenPresencaRepository.buscar_por_codigo(codigo);
  if (!token) {
    throw criar_erro("Token inválido.", 400);
  };
  if (!token.ativo) {
    throw criar_erro("Token já foi utilizado.", 400);
  };
  if (new Date() > token.data_expiracao) {
    throw criar_erro("Token expirado.", 400);
  };
  // Desativar token após validação (uso único)
  await TokenPresencaRepository.atualizar_por_id(token._id, { ativo: false });
  return token;
};

async function deletar(id) {
  const token = await TokenPresencaRepository.deletar_por_id(id);
  if (!token) {
    throw criar_erro("Token não encontrado.", 404);
  };
  return { message: "Token removido com sucesso!" };
};

const TokenPresencaService = {
  criar,
  buscar_por_id,
  listar_por_aula,
  listar_todos,
  validar,
  deletar,
};

export default TokenPresencaService;