import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { cookies } from "next/headers";

// Esquema de usuario (ajusta los campos según tu base de datos)
const UserSchema = new mongoose.Schema({
    email: String,
    nombre: String,
    username: String,
    biografia: String,
    avatar: String,
}, { collection: "Usuarios", strict: false});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function connectDB() {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.MONGODB_URI as string);
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const cookieStore = await cookies();
        const userEmail = cookieStore.get("userEmail")?.value;
        if (!userEmail) {
            return NextResponse.json({ success: false, error: "No autenticado" }, { status: 401 });
        }

        const { nombre, username, biografia, avatar } = await req.json();

        // Opcional: Validaciones básicas
        if (!nombre || !username) {
            return NextResponse.json({ success: false, error: "Nombre y usuario requeridos" }, { status: 400 });
        }

        // Verifica que el username no esté en uso por otro usuario
        const exists = await User.findOne({ username, email: { $ne: userEmail } });
        if (exists) {
            return NextResponse.json({ success: false, error: "El nombre de usuario ya está en uso" }, { status: 409 });
        }

        console.log("userEmail:", userEmail);
        const user = await User.findOne({ email: userEmail });
        console.log("Usuario encontrado:", user);

        const result = await User.updateOne(
            { email: userEmail },
            { $set: { nombre, username, biografia, avatar } }
        );
        console.log("Resultado del update:", result);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Error al actualizar el perfil" }, { status: 500 });
    }
}