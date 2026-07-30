import ProfessorRepository from "../repositories/professor.repository.js";
import criar_erro from "../utils/criar_erro.js";
import bcrypt from "bcryptjs";

async function cadastrarProfessor(nome, email, cpf, senha, id) {
  const resultadoemail = await ProfessorRepository.buscarPorEmail(email);
  const resultadocpf = await ProfessorRepository.buscarPorCpf(cpf);
  const resultadoid = await ProfessorRepository.buscarPorId(id);

  if (resultadoemail) {
    throw criar_erro("Email ja utilizado", 409);
  }

  if (resultadocpf) {
    throw criar_erro("Cpf ja utilizado", 409);
  }

  if (resultadoid) {
    throw criar_erro("Id ja utilizado", 409);
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const NovoProfessor = await ProfessorRepository.create({
    nome,
    email,
    cpf,
    senhaHash,
    id,
  });

  return NovoProfessor;
}

async function ListarProfessor(filtros = {}) {
  const { nome, email, cpf, id } = filtros;

  if (id) {
    const professorPorId = await ProfessorRepository.buscarPorId(id);
    if (!professorPorId) throw criar_erro("Professor não encontrado por ID", 404);
    return professorPorId;
  }

  if (email) {
    const professorPorEmail = await ProfessorRepository.buscarPorEmail(email);
    if (!professorPorEmail) throw criar_erro("Professor não encontrado por Email", 404);
    return professorPorEmail;
  }

  if (cpf) {
    const professorPorCpf = await ProfessorRepository.buscarPorCpf(cpf);
    if (!professorPorCpf) throw criar_erro("Professor não encontrado por Cpf", 404);
    return professorPorCpf;
  }

  if (nome) {
    const professorPorNome = await ProfessorRepository.buscarPorNome(nome);
    if (!professorPorNome) throw criar_erro("Professor não encontrado por nome", 404);
    return professorPorNome;
  }

  return ProfessorRepository.listarTodos();
}

async function AtualizarProfessor(id, dadosNovos = {}) {
  const ProfessorAtual = await ProfessorRepository.buscarPorId(id);

  if (!ProfessorAtual) {
    throw criar_erro("Professor não encontrado por ID", 404);
  }

  const { nome, email, cpf, foto } = dadosNovos;

  if (email && email !== ProfessorAtual.email) {
    const EmailExistente = await ProfessorRepository.buscarPorEmail(email);

    if (EmailExistente) {
      throw criar_erro("E-mail já está em uso por outro usuário", 409);
    }
  }

  if (cpf && cpf !== ProfessorAtual.cpf) {
    const CpfExistente = await ProfessorRepository.buscarPorCpf(cpf);

    if (CpfExistente) {
      throw criar_erro("CPF já está em uso por outro usuário", 409);
    }
  }

  const ProfessorAtualizado = await ProfessorRepository.atualizarPorId(id, {
    nome: nome || ProfessorAtual.nome,
    email: email || ProfessorAtual.email,
    cpf: cpf || ProfessorAtual.cpf,
    foto: foto !== undefined ? foto : ProfessorAtual.foto,
  });

  return ProfessorAtualizado;
}

async function deletarProfessor(id) {
  if (!id) {
    throw criar_erro("ID do professor não foi fornecido", 400);
  }

  const ProfessorExistente = await ProfessorRepository.buscarPorId(id);

  if (!ProfessorExistente) {
    throw criar_erro("Professor não encontrado pelo ID", 404);
  }

  await ProfessorRepository.deletarPorId(id);

  return { mensagem: "Professor deletado com sucesso" };
}

const professorService = {
  cadastrarProfessor,
  ListarProfessor,
  AtualizarProfessor,
  deletarProfessor,
}

export default professorService;