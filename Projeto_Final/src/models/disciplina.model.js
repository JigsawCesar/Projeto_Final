import mongoose from "mongoose";

const DisciplinaSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "O nome da disciplina é obrigatório!"],
            trim: true
        },

        codigo: {
            type: String,
            required: [true, "O código da disciplina é obrigatorio!"],
            unique: true,
            trim: true
        },

        carga_horaria: {
            type: Number,
            required: [true, "A carga horária é obrigatória!"]
        }
    },

    {
        timestamps: true
    }
);

const Disciplina = mongoose.model("Disciplina", DisciplinaSchema);
export default Disciplina;