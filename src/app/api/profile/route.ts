import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { cookies } from "next/headers";

// Esquema de usuario (ajusta los campos según tu base de datos)
const UserSchema = new mongoose.Schema({
    email: String,
    nombre: String,
    username: String,
    biografia: String, // <-- usa "biografia" si así lo usas en settings
    avatar: String,
}, { collection: "Usuarios" });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function connectDB() {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.MONGODB_URI as string);
}

export async function GET(req: NextRequest) {
    try {
        // Conectar a la base de datos
        await connectDB();
        // Obtener el email del usuario autenticado (ajusta según tu auth)
        const cookieStore = await cookies();
        const userEmail = cookieStore.get("userEmail")?.value;
        if (!userEmail) {
            return NextResponse.json({ user: null, error: "No autenticado" }, { status: 401 });
        }

        // Buscar usuario por email
        const user = await User.findOne({ email: userEmail }, "email nombre username biografia avatar").lean();
        if (!user) {
            return NextResponse.json({ user: null, error: "Usuario no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ user: null, error: "Error al obtener el perfil" }, { status: 500 });
    }
}