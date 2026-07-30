import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome é obrigatório!"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "O email é obrigatório!"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email inválido."],
    },

    cpf: {
      type: String,
      trim: true,
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
  }
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
