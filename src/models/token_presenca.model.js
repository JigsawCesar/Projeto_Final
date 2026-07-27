import mongoose from "mongoose";

const TokenPresencaSchema = new mongoose.Schema(
    {
        aula: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Aula",
            required: [true, "A aula é obrigatória!"]
        },

        codigo: {
            type: String,
            required: [true, "O código é obrigatório!"],
            unique: true,
            trim: true
        },

        qr_code: {
            type: String,
            required: [true, "O QR Code é obrigatório!"]
        },

        ativo: {
            type: Boolean,
            default: true
        },

        data_expiracao: {
            type: Date,
            required: [true, "A data de expiração é obrigatória!"]
        }
    },

    {
        timestamps: true
    }
);

const TokenPresenca = mongoose.model("TokenPresenca", TokenPresencaSchema);

export default TokenPresenca;