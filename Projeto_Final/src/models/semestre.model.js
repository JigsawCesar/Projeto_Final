import mongoose from "mongoose";
const SemestreSchema = new mongoose.Schema(
    {
        ano: {
            type: Number,
            required: [true, "O ano é obrigatório!"]
        },

        periodo: {
            type: String,
            required: [true, "O período é obrigatório!"],
            trim: true
        }
    },

    {
        timestamps: true
    }
);

const Semestre = mongoose.model("Semestre", SemestreSchema);
export default Semestre;