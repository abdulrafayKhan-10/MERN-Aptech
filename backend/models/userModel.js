const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]  // optional, restricts to specific roles
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]  // optional, restricts to specific statuses
    }
});

module.exports = mongoose.model("User", userSchema);
