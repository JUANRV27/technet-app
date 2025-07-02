import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

interface IUser {
    nombre: string;
    biografia: string;
    intereses: string;
    email: string;
}
// Esquema de usuario (ajusta los campos según tu base de datos)
const UserSchema = new mongoose.Schema<IUser>({
    nombre: String,
    biografia: String,
    intereses: String,
    email: String,
}, { collection: "Usuarios" });

const User = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>("User", UserSchema);

async function connectDB() {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.MONGODB_URI as string);
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        if (!email) {
            return NextResponse.json({ user: null, error: "Email no proporcionado" }, { status: 400 });
        }
        const user = await User.findOne({ email }).lean();
        if (!user) {
            return NextResponse.json({ user: null, error: "Usuario no encontrado" }, { status: 404 });
        }
        // Solo devuelve datos públicos
        const { nombre, biografia } = user as IUser;
        return NextResponse.json({ user: { nombre, biografia } });
    } catch (error) {
        return NextResponse.json({ user: null, error: "Error al obtener el perfil público" }, { status: 500 });
    }
}