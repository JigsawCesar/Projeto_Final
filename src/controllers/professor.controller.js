import professorService from "../services/professor.service.js";

async function cadastrarProfessor(req, res, next) {
  try {
    const { nome, email, cpf, senha, id } = req.body

    const novoProfessor = await professorService.cadastrarProfessor(
      nome,
      email,
      cpf,
      senha,
      id
    )

    return res.status(201).json(novoProfessor)
  } catch (error) {
    return res.status(error.status || 500).json({ erro: error.message })
  }
}

async function listarProfessor(req, res) {
  try {
    const filtros = req.query

    const professores = await professorService.ListarProfessor(filtros)

    return res.status(200).json(professores)
  } catch (error) {
    return res.status(error.status || 500).json({ erro: error.message })
  }
}

async function atualizarProfessor(req, res) {
  try {
    const { id } = req.params
    const dadosNovos = req.body;

    const professorAtualizado = await professorService.AtualizarProfessor(id, dadosNovos)

    return res.status(200).json(professorAtualizado)
  } catch (error) {
    return res.status(error.status || 500).json({ erro: error.message })
  }
}

async function deletarProfessor(req, res) {
  try {
    const { id } = req.params

    const resultado = await professorService.deletarProfessor(id);

    return res.status(200).json(resultado)
  } catch (error) {
    return res.status(error.status || 500).json({ erro: error.message })
  }
}

const professorController = {
    cadastrarProfessor,
    listarProfessor,
    atualizarProfessor,
    deletarProfessor
}

export default professorController;
