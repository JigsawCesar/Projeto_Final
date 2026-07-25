import Professor from "../models/professor.model.js";

async function create(dados) {
  return Professor.create(dados);
}

async function buscarPorEmail(email, incluirSenha = false) {
  const query = Professor.findOne({ email: email.trim().toLowerCase() });

  if (incluirSenha) {
    query.select("+senhaHash");
  }

  return query;
}

async function buscarPorCpf(cpf) {
  const cpfLimpo = cpf.replace(/\D/g, "");
  return Professor.findOne({ cpf: cpfLimpo });
}

async function buscarPorNome(nome) {
  return Professor.find({ nome: { $regex: nome, $options: "i" } });
}

async function buscarPorId(id) {
  return Professor.findById(id);
}

async function listarTodos() {
  return Professor.find().sort({ createdAt: -1 });
}

async function atualizarPorId(id, dadosAtualizados) {
  return Professor.findByIdAndUpdate(id, dadosAtualizados, {
    new: true,
    runValidators: true,
  });
}

async function deletarPorId(id) {
  return Professor.findByIdAndDelete(id);
}

const ProfessorRepository = {
  create,
  buscarPorEmail,
  buscarPorCpf,   
  buscarPorNome,  
  buscarPorId,
  listarTodos,
  atualizarPorId,
  deletarPorId,
};

export default ProfessorRepository;