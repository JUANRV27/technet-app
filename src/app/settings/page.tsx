"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideNavbar from "@/components/sideNavbar";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { CldUploadWidget } from "next-cloudinary";

declare global {
    interface Window {
        cloudinary: any;
    }
}

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
    const [isUploading, setIsUploading] = useState(false);
    const [uploadResult, setUploadResult] = useState<any>(null);

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

    useEffect(() => {
        const info = uploadResult?.info;
        if (
            info &&
            typeof info === "object" &&
            "secure_url" in info &&
            typeof info.secure_url === "string" &&
            info.secure_url !== avatar
        ) {
            setAvatar(info.secure_url);
        }
    }, [uploadResult, avatar]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const updateFields: any = {};
        if (nombre) updateFields.nombre = nombre;
        if (username) updateFields.username = username;
        if (biografia) updateFields.biografia = biografia;
        if (avatar) updateFields.avatar = avatar;

        if (Object.keys(updateFields).length === 0) {
            setError("No hay cambios para guardar.");
            return;
        }

        const res = await fetch("/api/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateFields),
        });
        const data = await res.json();
        if (data.success) {
            setSuccess("¡Perfil actualizado!");
            router.refresh();
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
                    <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-blue-400 mb-2">
                                {avatar ? (
                                    <img src={avatar} alt="Avatar" className="object-cover w-full h-full" />
                                ) : (
                                    <FaUser className="text-5xl text-blue-300" />
                                )}
                            </div>
                            <CldUploadWidget uploadPreset="TECHNET_PRESET">
                                {({ open }) => {
                                    const handleUpload = () => {
                                    const widget = window.cloudinary?.createUploadWidget(
                                        {
                                        cloudName: "dndozl1b5",
                                        uploadPreset: "TECHNET_PRESET",
                                        },
                                        (error: any, result: any) => {
                                        if (!error && result?.event === "success") {
                                            const url = result.info.secure_url;
                                            setAvatar(url);
                                            console.log("✅ Avatar subido:", url);
                                        }
                                        }
                                    );

                                    if (widget) widget.open();
                                    };

                                    return (
                                    <button
                                        type="button"
                                        onClick={handleUpload}
                                        className="bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm hover:bg-blue-200 transition"
                                    >
                                        Subir avatar
                                    </button>
                                    );
                                }}
                            </CldUploadWidget>

                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-blue-700 flex items-center gap-2">
                                <FaUser /> Nombre real
                            </label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                placeholder="Nombre"
                                className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-blue-700 flex items-center gap-2">
                                <FaUser /> Nombre de usuario
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Nombre de usuario"
                                className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-blue-700 flex items-center gap-2">
                                <FaEnvelope /> Biografía
                            </label>
                            <textarea
                                value={biografia}
                                onChange={e => setBio(e.target.value)}
                                placeholder="Biografía"
                                className="border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base resize-none"
                                rows={3}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-kdam text-lg rounded-full py-3 mt-2 hover:bg-blue-700 transition-colors shadow-md"
                            disabled={isUploading}
                        >
                            {isUploading ? "Espera a que termine la subida..." : "Guardar cambios"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}