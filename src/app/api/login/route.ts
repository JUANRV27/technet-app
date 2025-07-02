import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

// Esquema de usuario (ajusta según tu modelo real)
const UserSchema = new mongoose.Schema(
  {
    email: String,
    contrasena: String,
    username: String,
    // otros campos...
  },
  { collection: "Usuarios" }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, contrasena } = await req.json();

    const user = await User.findOne({ email });
    
    if (!user || !user.contrasena) {
      return NextResponse.json(
        { success: false, error: "Usuario o contraseña incorrectos" },
        { status: 401 }
      );
    }
    
    // Compara la contraseña en texto plano con el hash
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);

    if (!isMatch) {
    return NextResponse.json(
      { success: false, error: "Usuario o contraseña incorrectos" },
      { status: 401 }
    );
    }

    // Login correcto: guarda el email en la cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("userEmail", email, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    console.log("Login exitoso, enviando cookie y success:true");
    return response;
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json(
      { success: false, error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
