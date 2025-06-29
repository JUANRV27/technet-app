"use client";
import { useRouter } from "next/navigation";

export default function Hero() {
    const router = useRouter();
    return (
        <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-white px-6 text-center">
        <h1 className="font-kdam text-[56px] tracking-wide text-black leading-none">
            TechNet
        </h1>
        <p className="font-sans text-lg text-gray-600 mt-4 max-w-xl">
            Conecta más allá de la tecnología
        </p>
        <div className="mt-6 flex gap-4 flex-wrap justify-center">
            <a
            href="/register"
            className="px-6 py-3 bg-blue-500 text-white font-kdam text-lg rounded-md hover:bg-blue-700 transition-colors"
            >
            Registrarse
            </a>
            <button
            onClick={() => router.push("/login")}
            className="cursor-pointer px-6 py-3 border border-blue-500 text-blue-500 font-kdam text-lg rounded-md hover:bg-blue-100 transition-colors"
            >
            Iniciar sesión
            </button>
        </div>
        </section>
    );
}
