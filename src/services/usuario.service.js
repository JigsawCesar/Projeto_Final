import AlunoRepository from "../repositories/aluno.repository.js";
import ProfessorRepository from "../repositories/professor.repository.js";
import criar_erro from "../utils/criar_erro.js";
import bcrypt from "bcryptjs";

async function buscarPerfil(usuario) {
  if (!usuario?.id || !usuario?.tipo) {
    throw criar_erro("Dados do usuário inválidos.", 400);
  }

  if (usuario.tipo === "aluno") {
    const aluno = await AlunoRepository.buscarPorId(usuario.id);
    if (!aluno) {
      throw criar_erro("Aluno não encontrado.", 404);
    }

    return aluno;
  }

  if (usuario.tipo === "professor") {
    const professor = await ProfessorRepository.buscarPorId(usuario.id);
    if (!professor) {
      throw criar_erro("Professor não encontrado.", 404);
    }

    return professor;
  }

  if (usuario.tipo === "admin") {
    return {
      id: usuario.id,
      email: usuario.email,
      nome: "Administrador",
      tipo: "admin",
    };
  }

  throw criar_erro("Tipo de usuário inválido.", 400);
}

async function listarUsuarios() {
  const alunos = await AlunoRepository.listarTodos();
  const professores = await ProfessorRepository.listarTodos();

  return { alunos, professores };
}

async function atualizarPerfil(usuario, dadosNovos = {}) {
  if (usuario.tipo === "aluno") {
    const alunoAtual = await AlunoRepository.buscarPorId(usuario.id);
    if (!alunoAtual) {
      throw criar_erro("Aluno não encontrado.", 404);
    }

    const { nome, email, cpf, senha } = dadosNovos;
    const dadosAtualizados = {};

    if (nome) dadosAtualizados.nome = nome;
    if (email) dadosAtualizados.email = email;
    if (cpf) dadosAtualizados.cpf = cpf;
    if (senha) {
      dadosAtualizados.senhaHash = await bcrypt.hash(senha, 10);
    }

    return AlunoRepository.atualizarPorId(usuario.id, dadosAtualizados);
  }

  if (usuario.tipo === "professor") {
    const professorAtual = await ProfessorRepository.buscarPorId(usuario.id);
    if (!professorAtual) {
      throw criar_erro("Professor não encontrado.", 404);
    }

    const { nome, email, cpf, senha } = dadosNovos;
    const dadosAtualizados = {};

    if (nome) dadosAtualizados.nome = nome;
    if (email) dadosAtualizados.email = email;
    if (cpf) dadosAtualizados.cpf = cpf;
    if (senha) {
      dadosAtualizados.senhaHash = await bcrypt.hash(senha, 10);
    }

    return ProfessorRepository.atualizarPorId(usuario.id, dadosAtualizados);
  }

  if (usuario.tipo === "admin") {
    return { mensagem: "Administrador não pode ser alterado por esta rota." };
  }

  throw criar_erro("Tipo de usuário inválido.", 400);
}

async function removerMinhaConta(usuario) {
  if (usuario.tipo === "aluno") {
    await AlunoRepository.deletarPorId(usuario.id);
    return { mensagem: "Conta de aluno removida com sucesso." };
  }

  if (usuario.tipo === "professor") {
    await ProfessorRepository.deletarPorId(usuario.id);
    return { mensagem: "Conta de professor removida com sucesso." };
  }

  if (usuario.tipo === "admin") {
    return { mensagem: "Administrador não pode ser removido por esta rota." };
  }

  throw criar_erro("Tipo de usuário inválido.", 400);
}

const UsuarioService = {
  buscarPerfil,
  listarUsuarios,
  atualizarPerfil,
  removerMinhaConta,
};

export default UsuarioService;
