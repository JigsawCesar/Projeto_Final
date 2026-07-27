import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AlunoRepository from "../repositories/aluno.repository.js";
import ProfessorRepository from "../repositories/professor.repository.js";
import criar_erro from "../utils/criar_erro.js";

async function cadastrar(dados) {
  const { nome, email, cpf, senha, tipo = "aluno" } = dados;

  if (!nome || !email || !cpf || !senha) {
    throw criar_erro("Nome, email, cpf e senha são obrigatórios.", 400);
  }

  if (tipo === "aluno") {
    const emailExistente = await AlunoRepository.buscarPorEmail(email);
    const cpfExistente = await AlunoRepository.buscarPorCpf(cpf);

    if (emailExistente) {
      throw criar_erro("Email já cadastrado para um aluno.", 409);
    }

    if (cpfExistente) {
      throw criar_erro("CPF já cadastrado para um aluno.", 409);
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoAluno = await AlunoRepository.create({ nome, email, cpf, senhaHash });

    return {
      mensagem: "Aluno cadastrado com sucesso.",
      usuario: {
        id: novoAluno._id,
        nome: novoAluno.nome,
        email: novoAluno.email,
        tipo: "aluno",
      },
    };
  }

  if (tipo === "professor") {
    const emailExistente = await ProfessorRepository.buscarPorEmail(email);
    const cpfExistente = await ProfessorRepository.buscarPorCpf(cpf);

    if (emailExistente) {
      throw criar_erro("Email já cadastrado para um professor.", 409);
    }

    if (cpfExistente) {
      throw criar_erro("CPF já cadastrado para um professor.", 409);
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoProfessor = await ProfessorRepository.create({ nome, email, cpf, senhaHash });

    return {
      mensagem: "Professor cadastrado com sucesso.",
      usuario: {
        id: novoProfessor._id,
        nome: novoProfessor.nome,
        email: novoProfessor.email,
        tipo: "professor",
      },
    };
  }

  throw criar_erro("Tipo de usuário inválido. Use aluno ou professor.", 400);
}

async function login(dados) {
  const { email, senha, tipo } = dados;

  if (!email || !senha) {
    throw criar_erro("Email e senha são obrigatórios.", 400);
  }

  if (tipo === "admin") {
    if (
      process.env.ADMIN_EMAIL &&
      process.env.ADMIN_SENHA &&
      email === process.env.ADMIN_EMAIL &&
      senha === process.env.ADMIN_SENHA
    ) {
      const token = jwt.sign(
        { id: "admin", email, tipo: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      return {
        token,
        tipo: "admin",
        usuario: { id: "admin", email, tipo: "admin" },
      };
    }

    throw criar_erro("Credenciais de administrador inválidas.", 401);
  }

  const tiposParaTentar = tipo ? [tipo] : ["aluno", "professor"];

  for (const tipoAtual of tiposParaTentar) {
    let usuarioEncontrado = null;

    if (tipoAtual === "aluno") {
      usuarioEncontrado = await AlunoRepository.buscarPorEmail(email, true);
    }

    if (tipoAtual === "professor") {
      usuarioEncontrado = await ProfessorRepository.buscarPorEmail(email, true);
    }

    if (!usuarioEncontrado) {
      continue;
    }

    const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senhaHash);

    if (!senhaCorreta) {
      continue;
    }

    const token = jwt.sign(
      { id: usuarioEncontrado._id.toString(), email: usuarioEncontrado.email, tipo: tipoAtual },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return {
      token,
      tipo: tipoAtual,
      usuario: {
        id: usuarioEncontrado._id,
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
        tipo: tipoAtual,
      },
    };
  }

  throw criar_erro("Email ou senha inválidos.", 401);
}

const AuthService = {
  cadastrar,
  login,
};

export default AuthService;
