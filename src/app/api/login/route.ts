import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema, "Usuarios");

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();
    const user = await User.findOne({ email, password });
    if (user) {
      return NextResponse.json({ success: true, message: "Login correcto" });
    } else {
      return NextResponse.json({ success: false, message: "Credenciales incorrectas" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error en el servidor" }, { status: 500 });
  }
}
