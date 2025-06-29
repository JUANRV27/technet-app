import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
    try {
        await connectToDatabase();
        return Response.json({ success: true, message: "Conexión exitosa a MongoDB" });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return Response.json({ success: false, message: "Error de conexión", error: errorMessage });
    }
}
