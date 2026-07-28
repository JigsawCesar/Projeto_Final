import mongoose from "mongoose";

const AulaSchema = new mongoose.Schema(
    {
        turma: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Turma",
            required: [true, "A turma é obrigatória!"]
        },

        data: {
            type: Date,
            required: [true, "A data da aula é obrigatória!"]
        },

        horario: {
            type: String,
            required: [true, "O horário da aula é obrigatório!"],
            trim: true
        },

        status: {
            type: String,
            enum: ["fechada", "aberta"],
            default: "fechada"
        }
    },

    {
        timestamps: true
    }
);

const Aula = mongoose.model("Aula", AulaSchema);
export default Aula;
