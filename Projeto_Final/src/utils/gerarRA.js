import Aluno from "../models/aluno.model";

async function GerarRA() {
  const anoAtual = new Date().getFullYear().toString();

  const ultimoAluno = await Aluno.findOne({ra: { $regex: `^${anoAtual}` },}).sort({ ra: -1 });

  if (!ultimoAluno) {
    return `${anoAtual}001`;
  }

const ultimoNumero = parseInt(ultimoAluno.ra.slice(-3));

const proximoNumero = (ultimoNumero + 1).toString().padStart(3, '0');

return `${anoAtual}${proximoNumero}`;
}

export default GerarRA