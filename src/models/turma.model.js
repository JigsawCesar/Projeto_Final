import mongoose from "mongoose";

const TurmaSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "O nome da turma é obrigatório!"],
            trim: true
        },

        horario: {
            type: String,
            required: [true, "O horário da turma é obrigatório!"],
            trim: true
        },

        disciplina: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Disciplina",
            required: [true, "A disciplina é obrigatória!"]
        },

        professor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Professor",
            required: [true, "O professor é obrigatório!"]
        },

        semestre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Semestre",
            required: [true, "O semestre é obrigatório!"]
        },

        alunos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Aluno",
            }
        ]
    },

    {
        timestamps: true
    }
);

const Turma = mongoose.model("Turma", TurmaSchema);
export default Turma;
