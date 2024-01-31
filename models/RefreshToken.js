import mongoose from 'mongoose'
import { v4 } from 'uuid'

const refresh_token_schema = new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    expiryDate: Date,
});

const RefreshToken = mongoose.model("RefreshToken", refresh_token_schema);

export default RefreshToken;

