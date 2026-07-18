import mongoose from "mongoose";

const ProfessorSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      requeride: [true, "O nome é obrogatório."],
    },
    email: {
      type: String,
      requeride: [true, "O email é obrigatório"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email inválido."],
    },
    cpf: {
      type: Number,
      requeride: [true, "O CPF é obrigatório"],
      match: [/^\d{11}$/,"CPF inválido. Insira apenas os 11 dígitos numéricos.",],
    },
    senhaHash: {
      type: String,
      requeride: [true, "A senha é obrigatória!"],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

const Professor = mongoose.model("Professor", ProfessorSchema);

export default Professor;
