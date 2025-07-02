"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideNavbar from "@/components/sideNavbar";

export default function SettingsPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [nombre, setNombre] = useState("");
    const [username, setUsername] = useState("");
    const [biografia, setBio] = useState("");
    const [avatar, setAvatar] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/profile");
                const data = await res.json();
                if (data.user) {
                    setUser(data.user);
                    setNombre(data.user.nombre || "");
                    setUsername(data.user.username || "");
                    setBio(data.user.biografia || "");
                    setAvatar(data.user.avatar || "");
                } else {
                    setError(data.error || "No autenticado");
                }
            } catch {
                setError("Error al cargar los datos");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        const res = await fetch("/api/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, username, biografia, avatar }),
        });
        const data = await res.json();
        if (data.success) {
            setSuccess("¡Perfil actualizado!");
            router.refresh(); // Opcional: recarga los datos
        } else {
            setError(data.error || "Error al actualizar");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <span className="text-gray-500">Cargando configuración...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <span className="text-red-500">{error}</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-gray-100">
            <aside className="p-6">
                <SideNavbar />
            </aside>
            <main className="flex-1 flex flex-col items-center justify-center py-10">
                <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-xl flex flex-col items-center">
                    <h2 className="font-kdam text-3xl text-blue-700 mb-6">Configuración de perfil</h2>
                    {success && <span className="text-green-600 mb-4">{success}</span>}
                    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            placeholder="Nombre"
                            className="border rounded px-4 py-2"
                        />
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Nombre de usuario"
                            className="border rounded px-4 py-2"
                        />
                        <input
                            type="text"
                            value={avatar}
                            onChange={e => setAvatar(e.target.value)}
                            placeholder="URL del avatar"
                            className="border rounded px-4 py-2"
                        />
                        <textarea
                            value={biografia}
                            onChange={e => setBio(e.target.value)}
                            placeholder="Biografía"
                            className="border rounded px-4 py-2"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded py-2 mt-2 hover:bg-blue-700 transition"
                        >
                            Guardar cambios
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}