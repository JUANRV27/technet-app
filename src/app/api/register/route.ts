import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

// Esquema de usuario simple
const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema, "Usarios");

// Conexión a MongoDB
async function connectDB() {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.MONGODB_URI as string);
    }

    export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { username, email, password } = await req.json();

        // Validación básica
        if (!username || !email || !password) {
        return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Correo electrónico inválido" }, { status: 400 });
        }

        // Verifica si el usuario ya existe
        const exists = await User.findOne({ email });
        if (exists) {
        return NextResponse.json({ error: "El correo ya está registrado" }, { status: 409 });
        }

        // Crea el usuario
        const user = new User({ username, email, password });
        await user.save();

        return NextResponse.json({ success: true, message: "Usuario registrado correctamente" });
    } catch (error) {
        return NextResponse.json({ error: "Error en el registro" }, { status: 500 });
    }
}