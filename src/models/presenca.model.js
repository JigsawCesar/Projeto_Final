import mongoose from "mongoose";

const PresencaSchema = new mongoose.Schema(
    {
        aluno: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Aluno",
            required: [true, "O aluno é obrigatório!"]
        },

        aula: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Aula",
            required: [true, "A aula é obrigatória!"]
        },

        token: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TokenPresenca",
            required: [true, "O token é obrigatório!"]
        },

        data_registro: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: ["presente", "atrasado", "justificado"],
            default: "presente"
        }
    },

    {
        timestamps: true
    }
);

const Presenca = mongoose.model("Presenca", PresencaSchema);

export default Presenca;