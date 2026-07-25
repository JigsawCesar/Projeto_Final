import mongoose from "mongoose";

const AlunoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome é obrigatório"],
    },
    email: {
      type: String,
      required: [true, "O email é obrigatório"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email inválido."],
    },
    cpf: {
      type: String,
      required: [true, "O CPF é obrigatório"],
      match: [/^\d{11}$/,"CPF inválido. Insira apenas os 11 dígitos numéricos."],
    },
    senhaHash: {
      type: String,
      required: [true, "A senha é obrigatória"],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

const Aluno = mongoose.model("Aluno", AlunoSchema);

export default Aluno;
