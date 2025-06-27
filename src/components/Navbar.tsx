export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="font-kdam text-4xl tracking-wide">TechNet</h1>
        <div className="space-x-4">
            <a
            href="/login"
            className="font-kdam text-xl hover:text-blue-500 transition-colors duration-200"
            >
            Iniciar sesión
            </a>
            <a
            href="/register"
            className="bg-blue-500 text-white font-kdam text-xl px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow"
            >
            Registrarse
            </a>
        </div>
        </nav>
    );
}
