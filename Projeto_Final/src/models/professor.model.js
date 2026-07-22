import mongoose from "mongoose";

const ProfessorSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome é obrigatório."],
      required: [true, "O nome é obrogatório."],
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
      match: [/^\d{11}$/,"CPF inválido. Insira apenas os 11 dígitos numéricos.",],
    },
    senhaHash: {
      type: String,
      required: [true, "A senha é obrigatória!"],
      select: false,
    }
  },
  {
    timestamps: true,
  },
);

const Professor = mongoose.model("Professor", ProfessorSchema);

export default Professor;
