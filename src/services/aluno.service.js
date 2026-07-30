import AlunoRepository from "../repositories/aluno.repository.js";
import criar_erro from "../utils/criar_erro.js";
import bcrypt from "bcryptjs";
import GerarRA from "../utils/gerarRA.js";

async function cadastrarAluno(nome, email, cpf, senha, id) {
  const resultadoemail = await AlunoRepository.buscarPorEmail(email);
  const resultadocpf = await AlunoRepository.buscarPorCpf(cpf);
  const resultadoid = await AlunoRepository.buscarPorId(id);

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
  const ra = await GerarRA();

  const NovoAluno = await AlunoRepository.create({
    nome,
    email,
    cpf,
    senhaHash: senhaHash,
    ra,
    id
  });

  return NovoAluno;
}

async function ListarAlunos(filtros = {}) {
  const { nome, email, cpf, id } = filtros;

  if (id) {
    const alunoPorId = await AlunoRepository.buscarPorId(id);
    if (!alunoPorId) throw criar_erro("Aluno não encontrado pelo ID", 404);
    return alunoPorId;
  }

  if (email) {
    const alunoPorEmail = await AlunoRepository.buscarPorEmail(email);
    if (!alunoPorEmail) throw criar_erro("Aluno não encontrado por Email", 404);
    return alunoPorEmail;
  }

  if (cpf) {
    const alunoPorCpf = await AlunoRepository.buscarPorCpf(cpf);
    if (!alunoPorCpf) throw criar_erro("Aluno não encontrado por Cpf", 404);
    return alunoPorCpf;
  }

  if (nome) {
    const alunoPorNome = await AlunoRepository.buscarPorNome(nome);
    if (!alunoPorNome) throw criar_erro("Aluno não encontrado por Nome", 404);
    return alunoPorNome;
  }

  return await AlunoRepository.listarTodos();
}

async function AtualizarAluno(id, dadosNovos = {}) {
  const AlunoAtual = await AlunoRepository.buscarPorId(id);

  if (!AlunoAtual) {
    throw criar_erro("Aluno não encontrado pelo ID", 404);
  }

  const { nome, cpf, email } = dadosNovos;

  if (email && email !== AlunoAtual.email) {
    const EmailExistente = await AlunoRepository.buscarPorEmail(email);

    if (EmailExistente) {
      throw criar_erro("E-mail já está em uso por outro usuario", 409);
    }
  }

  if (cpf && cpf !== AlunoAtual.cpf) {
    const CpfExistente = await AlunoRepository.buscarPorCpf(cpf);

    if (CpfExistente) {
      throw criar_erro("CPF ja está sendo utulizado por outro usuario", 409);
    }
  }

  const AlunoAtualizado = await AlunoRepository.atualizarPorId(id, {
    nome: nome || AlunoAtual.nome,
    email: email || AlunoAtual.email,
    cpf: cpf || AlunoAtual.cpf
  });

  return AlunoAtualizado;
}

async function DeletarAluno(id) {
  if (!id) {
    throw criar_erro("ID do aluno não foi fornecido", 400);
  }

  const alunoExistente = await AlunoRepository.buscarPorId(id);

  if (!alunoExistente) {
    throw criar_erro("Aluno não encontrado pelo ID", 404);
  }

  await AlunoRepository.deletarPorId(id);

  return { mensagem: "Aluno deletado com sucesso" };
}

export default {
  cadastrarAluno,
  ListarAlunos,
  AtualizarAluno,
  DeletarAluno
};