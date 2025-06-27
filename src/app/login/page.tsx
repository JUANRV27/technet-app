"use client";
import Navbar from "@/components/Navbar";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: 'url(/Register.jpg)' }}>
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 flex flex-col items-center justify-center px-4">
                    <div className="bg-white/40 border border-black rounded-[2.5rem] shadow-lg p-8 w-full max-w-md flex flex-col items-center backdrop-blur-md">
                        <h2 className="font-kdam text-3xl text-blue-700 mb-6">Iniciar sesión</h2>
                        <form className="w-full flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-gray-700 mb-1 ml-1">Usuario</label>
                                <div className="relative w-full">
                                    <span className="absolute left-3 inset-y-0 flex items-center text-blue-400">
                                        <FaEnvelope />
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="Correo electrónico"
                                        className="pl-10 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg w-full"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-gray-700 mb-1 ml-1">Contraseña</label>
                                <div className="relative w-full">
                                    <span className="absolute left-3 inset-y-0 flex items-center text-blue-400">
                                        <FaLock />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Contraseña"
                                        className="pl-10 pr-10 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg w-full"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 inset-y-0 flex items-center text-blue-400 focus:outline-none"
                                        tabIndex={-1}
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white font-kdam text-lg rounded-md py-3 mt-2 hover:bg-blue-700 transition-colors shadow-md"
                            >
                                Entrar
                            </button>
                        </form>
                        <a href="/register" className="mt-4 text-blue-500 hover:underline text-sm">
                            ¿No tienes cuenta? Regístrate
                        </a>
                    </div>
                </main>
            </div>
        </div>
    );
}
