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
  },

  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
