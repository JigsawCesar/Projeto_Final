import alunoService from "../services/aluno.service.js"
import criar_erro from "../utils/criar_erro.js"
import gerarRA from "../utils/gerarRA.js"


async function cadastrarAluno(req, res, next) {
  try{
  const {nome, email, cpf, senha, id} = req.body

  const novoAluno = await alunoService.cadastrarAluno(
    nome,
    email,
    cpf,
    senha,
    id
  )

  return res.status(201).json(novoAluno)
  } catch(error){
return res.status(error.status || 500).json({erro: error.message})
  }
}

async function listarAluno(req, res) {
  try{
  const filtros = req.query

  const alunos = await alunoService.ListarAlunos(filtros)

  return res.status(200).json(alunos)
  } catch(error) {
    return res.status(error.status || 500).json({erro: error.message})
  }
}

async function atualizarAluno(req, res) {
  try{
    const {id} = req.params
    const dadosNovos = req.body;

    const AlunoAtualizado = await alunoService.AtualizarAluno(id, dadosNovos)

    return res.status(200).json(AlunoAtualizado)
  } catch(error){
return res.status(error.status || 500).json({erro: error.message})
  }
}

async function deletarAluno(req, res){
  try{
    const {id} = req.params

    const resultado = await alunoService.DeletarAluno(id);

    return res.status(200).json(resultado)
  } catch(error){
    return res.status(error.status || 500).json({erro: error.message})
  }
}

export default {
  cadastrarAluno,
  listarAluno,
  atualizarAluno,
  deletarAluno
}
