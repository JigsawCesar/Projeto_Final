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
    ra: {
      type: String,
      unique: true,
    },
    foto: {
      type: String,
      default: null,
      validate: {
        validator: function (valor) {
          if (valor === null || valor === undefined || valor === "") return true;
          return /^data:image\/(png|jpe?g|webp);base64,/.test(valor) && valor.length <= 900000;
        },
        message: "Foto inválida. Envie uma imagem (png, jpg ou webp) em base64 de até ~650KB.",
      },
    },
  },
  {
    timestamps: true,
  },
);

const Aluno = mongoose.model("Aluno", AlunoSchema);

export default Aluno;
