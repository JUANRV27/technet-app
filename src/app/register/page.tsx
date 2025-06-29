"use client";
import Navbar from "@/components/Navbar";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (value && !validateEmail(value)) {
        setEmailError("Correo electrónico inválido");
        } else {
        setEmailError("");
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        // Validar en tiempo real si las contraseñas coinciden
        if (confirmPassword && e.target.value !== confirmPassword) {
            setPasswordError("Las contraseñas no coinciden");
        } else {
            setPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (password && e.target.value !== password) {
            setPasswordError("Las contraseñas no coinciden");
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validación final antes de enviar
        if (password !== confirmPassword) {
            setPasswordError("Las contraseñas no coinciden");
            return;
        }
        // Aquí va la lógica para enviar el formulario
    };
    
    return (
        <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: 'url(/Register.jpg)' }}>
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 flex flex-col items-center justify-center px-4">
                    <div className="bg-white/40 border border-black rounded-[2.5rem] shadow-lg p-8 w-full max-w-md flex flex-col items-center backdrop-blur-md">
                        <h2 className="font-kdam text-3xl text-blue-700 mb-6">Crear cuenta</h2>
                        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-gray-700 mb-1 ml-1">Nombre de usuario</label>
                                <div className="relative w-full">
                                    <span className="absolute left-3 inset-y-0 flex items-center text-blue-400">
                                        <FaUser />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Nombre de usuario"
                                        className="pl-10 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg w-full"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-gray-700 mb-1 ml-1">Correo electrónico</label>
                                <div className="relative w-full">
                                    <span className="absolute left-3 inset-y-0 flex items-center text-blue-400">
                                        <FaEnvelope />
                                    </span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder="Correo electrónico"
                                        className="pl-10 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg w-full"
                                        required
                                    />
                                    {emailError && (
                                        <span className="text-red-500 text-sm">{emailError}</span>
                                    )}
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
                                        value={password}
                                        onChange={handlePasswordChange}
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
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-gray-700 mb-1 ml-1">Confirmar contraseña</label>
                                <div className="relative w-full">
                                    <span className="absolute left-3 inset-y-0 flex items-center text-blue-400">
                                        <FaLock />
                                    </span>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirmar contraseña"
                                        className="pl-10 pr-10 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg w-full"
                                        required
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-3 inset-y-0 flex items-center text-blue-400 focus:outline-none"
                                        tabIndex={-1}
                                        aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {passwordError && (
                                    <span className="text-red-500 text-sm">{passwordError}</span>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white font-kdam text-lg rounded-md py-3 mt-2 hover:bg-blue-700 transition-colors shadow-md"
                            >
                                Registrarse
                            </button>
                        </form>
                        <a href="/login" className="mt-4 text-blue-500 hover:underline text-sm">
                            ¿Ya tienes cuenta? Inicia sesión
                        </a>
                    </div>
                </main>
            </div>
        </div>
    );
}
