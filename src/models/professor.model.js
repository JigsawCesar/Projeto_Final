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

const Professor = mongoose.model("Professor", ProfessorSchema);

export default Professor;
