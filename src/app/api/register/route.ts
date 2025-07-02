import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    username: string;
    email: string;
    avatar?: string;
    contrasena: string;
}
const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    contrasena: { type: String, required: true },
    avatar: { type: String, default: "https://miapp.com/default-avatar.jpg" },
}, {
    collection: "Usuarios",
});

const User = mongoose.models.User || mongoose.model("User", UserSchema, "Usuarios");

// Conexión a MongoDB
async function connectDB() {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.MONGODB_URI as string);
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { username, email, contrasena } = await req.json();

        // Validación básica
        if (!username || !email || !contrasena) {
            return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Correo electrónico inválido" }, { status: 400 });
        }

        // Verifica si el usuario o correo ya existen
        const existsEmail = await User.findOne({ email });
        if (existsEmail) {
            return NextResponse.json({ error: "El correo ya está registrado" }, { status: 409 });
        }
        const existsUsername = await User.findOne({ username });
        if (existsUsername) {
            return NextResponse.json({ error: "El nombre de usuario ya está registrado" }, { status: 409 });
        }

        // Hashea la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crea el usuario
        const user = new User({ username, email, contrasena: hashedPassword });
        await user.save();

        return NextResponse.json({ success: true, message: "Usuario registrado correctamente" });
    } catch (error) {
        return NextResponse.json({ error: "Error en el registro" }, { status: 500 });
    }
}