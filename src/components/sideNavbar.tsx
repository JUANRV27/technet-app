"use client";
import { FaUserCircle, FaHome, FaBell, FaSignOutAlt, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function sideNavbar() {
    const router = useRouter();
    return (
        <nav className="flex flex-col gap-6">
            <button onClick={() => router.push("/feed")} type="button" title="Inicio" className="text-blue-500 hover:text-blue-700">
                <FaHome size={24} />
            </button>
            <button type="button" title="Notificaciones" className="text-gray-400 hover:text-blue-700">
                <FaBell size={24} />
            </button>
            <button onClick={() => router.push("/landing")} type="button" title="Cerrar sesión" className="text-gray-400 hover:text-blue-700 mt-8">
                <FaSignOutAlt size={24} />
            </button>
        </nav>
    );
}