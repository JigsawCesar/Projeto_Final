import AlunoRepository from "../repositories/aluno.repository.js";
import criar_erro from "../utils/criar_erro.js";

async function cadastrarAluno(nome, email, cpf, senha, id) {
  const resultadoemail = await AlunoRepository.buscarPorEmail(email);
  const resultadocpf = await AlunoRepository.buscarPorCpf(cpf);
  const resultadonome = await AlunoRepository.buscarPorNome(nome);
  const resultadoid = await AlunoRepository.buscarPorId(id);

  if (resultadoemail) {
    return criar_erro("Email ja utilizado", 401);
  }

  if (resultadocpf) {
    return criar_erro("Cpf ja utilizado", 401);
  }

  if (resultadonome) {
    return criar_erro("Nome ja utilizado", 401);
  }

  if (resultadoid) {
    return criar_erro("Id ja utilizado", 401);
  }

  const NovoAluno = await AlunoRepository.create({
    nome,
    email,
    cpf,
    senha
  });

  return NovoAluno;
}

async function ListarAlunos(filtros = {}) {
  const { nome, email, cpf, id } = filtros;

  if (id) {
    const alunoPorId = await AlunoRepository.buscarPorId(id);
    if (!alunoPorId) return criar_erro("Aluno não encontrado pelo ID", 404);
    return alunoPorId;
  }

  if (email) {
    const alunoPorEmail = await AlunoRepository.buscarPorEmail(email);
    if (!alunoPorEmail) return criar_erro("Aluno não encontrado por Email", 404);
    return alunoPorEmail;
  }

  if (cpf) {
    const alunoPorCpf = await AlunoRepository.buscarPorCpf(cpf);
    if (!alunoPorCpf) return criar_erro("Aluno não encontrado por Cpf", 404);
    return alunoPorCpf;
  }

  if (nome) {
    const alunoPorNome = await AlunoRepository.buscarPorNome(nome);
    if (!alunoPorNome) return criar_erro("Aluno não encontrado por Nome", 404);
    return alunoPorNome;
  }


  return await AlunoRepository.listarTodos();
}

async function AtualizarAluno(id, dadosNovos = {}) {
  const AlunoAtual = await AlunoRepository.buscarPorId(id);

  if (!AlunoAtual) {
    return criar_erro("Aluno não encontrado pelo ID", 404);
  }

  const { nome, cpf, email } = dadosNovos;

  if (email && email !== AlunoAtual.email) {
    const EmailExistente = await AlunoRepository.buscarPorEmail(email);

    if (EmailExistente) {
      return criar_erro("E-mail já está em uso por outro usuario", 401);
    }
  }

  if (cpf && cpf !== AlunoAtual.cpf) {
    const CpfExistente = await AlunoRepository.buscarPorCpf(cpf);

    if (CpfExistente) {
      return criar_erro("CPF ja está sendo utulizado por outro usuario", 401);
    }
  }

  if (nome && nome !== AlunoAtual.nome) {
    const NomeExistente = await AlunoRepository.buscarPorNome(nome);

    if (NomeExistente) {
      return criar_erro("Nome ja esta sendo utilizado", 401);
    }
  }

  const AlunoAtualizado = await AlunoRepository.atualizar(id, {
    nome: nome || AlunoAtual.nome,
    email: email || AlunoAtual.email,
    cpf: cpf || AlunoAtual.cpf
  });

  return AlunoAtualizado;
}


async function DeletarAluno(id) {
  if (!id) {
    return criar_erro("ID do aluno não foi fornecido", 400);
  }

  const alunoExistente = await AlunoRepository.buscarPorId(id);

  if (!alunoExistente) {
    return criar_erro("Aluno não encontrado pelo ID", 404);
  }

  await AlunoRepository.deletar(id);

  return { mensagem: "Aluno deletado com sucesso" };
}

export default {
  cadastrarAluno,
  ListarAlunos,
  AtualizarAluno,
  DeletarAluno
};