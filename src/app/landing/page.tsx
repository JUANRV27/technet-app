import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center">
            <Hero />
            {/* Sección de ejemplo con imagen y texto */}
            <section className="mt-16 flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-5xl px-6">
            <img
                src="/globe.svg"
                alt="Ejemplo comunidad"
                className="w-64 h-64 object-contain drop-shadow-lg"
            />
            <div className="max-w-md text-center md:text-left">
                <h2 className="text-3xl font-kdam text-blue-700 mb-4">Únete a la comunidad</h2>
                <p className="text-gray-600 text-lg mb-4">
                Comparte conocimientos, haz preguntas y conecta con otros entusiastas de la tecnología en TechNet.
                </p>
                <a
                href="/register"
                className="inline-block px-6 py-3 bg-blue-500 text-white font-kdam text-lg rounded-md hover:bg-blue-700 transition-colors"
                >
                Comenzar ahora
                </a>
            </div>
            </section>
        </main>
        <footer className="py-8 text-center text-gray-400 text-sm">
            <span>© 2025 TechNet. Todos los derechos reservados.</span>
        </footer>
        </div>
    );
}
