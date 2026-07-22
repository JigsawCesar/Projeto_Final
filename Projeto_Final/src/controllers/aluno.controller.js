import AlunoRepository from "../repositories/aluno.repository.js";
import GerarRA from "../utils/gerarRA.js";
import bcrypt from "bcryptjs";

export const criarAluno = async (req, res) => {
  try {
    const { nome, email, senha, curso } = req.body;

    const alunoExistente = await AlunoRepository.buscarPorEmail(email);

    if (alunoExistente) {
        return res.status(400).json({ mensagem: "E-mail já cadastrado no sistema." });
    }

    const ra = await GerarRA();

    const senhaCriptografada = await bycript.hash(senha, 10)

    const novoAluno = await AlunoRepository.criar({
        nome,
        email,
        senha: senhaCriptografada,
        curso,
        ra,
    })

    return res.status(201).json({mensagem:"Aluno cadastrado com sucesso!", aluno: novoAluno})

  } catch (error) {
    return res.status(500).json({mensagem: "Erro interno do servidor ao cadastrar aluno.",erro: error.message});
  }
};
