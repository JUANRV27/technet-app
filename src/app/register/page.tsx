"use client";
import Navbar from "@/components/Navbar";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        if (!e.target.value.trim()) {
            setUsernameError("El nombre de usuario es obligatorio");
        } else {
            setUsernameError("");
        }
    };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) {
            setUsernameError("El nombre de usuario es obligatorio");
            return;
        }
        if (password !== confirmPassword) {
            setPasswordError("Las contraseñas no coinciden");
            return;
        }
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, contrasena: password }),
        });
        const data = await res.json();
        if (data.success) {
            setSuccessMessage("¡Registro exitoso! Redirigiendo...");
            setTimeout(() => {
                router.push("/feed");
            }, 1500); // 1.5 segundos de espera
        } else {
            setPasswordError(data.error || "Error en el registro");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url(/Register.jpg)' }}>
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 flex flex-col items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-white/40 border border-black rounded-[2.5rem] shadow-lg p-8 w-full max-w-md flex flex-col items-center backdrop-blur-md"
                    >
                        <h2 className="font-kdam text-3xl text-blue-700 mb-6">Crear cuenta</h2>
                        {successMessage && (
                            <span className="mb-4 text-green-600 font-semibold text-center">{successMessage}</span>
                        )}
                        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-gray-700 mb-1 ml-1">Nombre de usuario</label>
                                <div className="relative w-full">
                                    <span className="absolute left-3 inset-y-0 flex items-center text-blue-400">
                                        <FaUser />
                                    </span>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        placeholder="Nombre de usuario"
                                        className="pl-10 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg w-full"
                                        required
                                    />
                                    {usernameError && (
                                        <span className="text-red-500 text-sm">{usernameError}</span>
                                    )}
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
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
