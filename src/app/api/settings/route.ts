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

const User = mongoose.models.Usuarios || mongoose.model("Usuarios", UserSchema);

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

        const updateFields: any = {};
        if (nombre !== undefined && nombre !== "") updateFields.nombre = nombre;
        if (username !== undefined && username !== "") updateFields.username = username;
        if (biografia !== undefined && biografia !== "") updateFields.biografia = biografia;
        if (avatar !== undefined && avatar !== "") updateFields.avatar = avatar;

        console.log("Campos recibidos para actualizar:", updateFields);

        const result = await User.updateOne(
            { email: userEmail },
            { $set: updateFields }
        );
        console.log("Resultado del update:", result);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Error al actualizar el perfil" }, { status: 500 });
    }
}