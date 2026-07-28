import Admin from "../models/admin.model.js";

async function create(dados) {
  return Admin.create(dados);
}

async function buscarPorEmail(email, incluirSenha = false) {
  const query = Admin.findOne({ email: email.trim().toLowerCase() });

  if (incluirSenha) {
    query.select("+senhaHash");
  }

  return query;
}

async function buscarPorId(id) {
  return Admin.findById(id);
}

async function atualizarPorId(id, dadosAtualizados) {
  return Admin.findByIdAndUpdate(id, dadosAtualizados, {
    new: true,
    runValidators: true,
  });
}

const AdminRepository = {
  create,
  buscarPorEmail,
  buscarPorId,
  atualizarPorId,
};

export default AdminRepository;
