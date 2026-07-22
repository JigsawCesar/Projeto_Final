import Aluno from "../models/aluno.model.js";

async function create(dados) {
  return Aluno.create(dados);
}

async function buscarPorEmail(email, incluirSenha = false) {
  const query = Aluno.findOne({ email: email.trim().toLowerCase() });

  if (incluirSenha) {
    query.select("+senhaHash");
  }

  return query;
}

async function buscarPorCpf(cpf) {
  const cpfLimpo = cpf.replace(/\D/g, "");
  return Aluno.findOne({ cpf: cpfLimpo });
}

async function buscarPorNome(nome) {
  return Aluno.find({ nome: { $regex: nome, $options: "i" } });
}

async function buscarPorId(id) {
  return Aluno.findById(id);
}

async function listarTodos() {
  return Aluno.find().sort({ createdAt: -1 });
}

async function atualizarPorId(id, dadosAtualizados) {
  return Aluno.findByIdAndUpdate(id, dadosAtualizados, {
    new: true,
    runValidators: true,
  });
}

async function deletarPorId(id) {
  return Aluno.findByIdAndDelete(id);
}

const AlunoRepository = {
  create,
  buscarPorEmail,
  buscarPorCpf,   
  buscarPorNome,  
  buscarPorId,
  listarTodos,
  atualizarPorId,
  deletarPorId,
};

export default AlunoRepository;
