"use client";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/profile");
                const data = await res.json();
                if (data.user) {
                    setUser(data.user);
                } else {
                    setError(data.error || "No autenticado");
                    // Opcional: redirige al login si no está autenticado
                    // if (data.error === "No autenticado") router.push("/login");
                }
            } catch {
                setError("Error al cargar el perfil");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <span className="text-gray-500">Cargando perfil...</span>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <span className="text-red-500">{error || "No se pudo cargar el perfil."}</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-xl flex flex-col items-center">
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt="Avatar"
                        className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                ) : (
                    <FaUserCircle className="text-gray-400 text-[8rem] mb-4" />
                )}
                <h2 className="font-kdam text-3xl text-blue-700">{user.nombre}</h2>
                <span className="text-gray-500 mb-2">@{user.username}</span>
                <p className="text-gray-700 text-center">{user.bio}</p>
                <button
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={() => router.push("/settings")}
                >
                    Editar perfil
                </button>
            </div>
        </div>
    );
}