"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Hero() {
    const router = useRouter();
    return (
        <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full flex flex-col items-center justify-center py-24 px-4 relative bg-cover bg-center"
        style={{ backgroundImage: "url(/hero_imagen_bg.jpg)" }}
        >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6 text-center">
            ¡Bienvenido a TechNet!
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 text-center max-w-2xl">
            Conecta, comparte y aprende sobre tecnología con una comunidad vibrante.
            Únete ahora y lleva tu red al siguiente nivel.
            </p>
            <div className="flex gap-6">
            <a
                href="/login"
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
            >
                Iniciar sesión
            </a>
            <a
                href="/register"
                className="bg-white text-blue-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-100 transition"
            >
                Regístrate
            </a>
            </div>
        </div>
        </motion.section>
    );
}
