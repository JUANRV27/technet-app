"use client";
import { FaUserCircle, FaHome, FaBell, FaSignOutAlt, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import SideNavbar from "../../components/sideNavbar";
export default function FeedPage() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-20 bg-white border-r flex flex-col items-center py-8 gap-8">
                <FaUserCircle className="text-4xl text-blue-500 mb-8" />
                <SideNavbar />
            </aside>
            {/* Main Feed */}
            <main className="flex-1 flex flex-col items-center py-10 px-4">
                {/* Header */}
                <div className="w-full max-w-2xl flex items-center justify-between mb-8">
                    <h1 className="font-kdam text-3xl text-blue-700">Feed</h1>
                    <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
                        <FaPlus /> Nuevo post
                    </button>
                </div>
                {/* Posts */}
                <div className="w-full max-w-2xl flex flex-col gap-6">
                    {[1, 2, 3].map((post) => (
                        <div key={post} className="bg-white rounded-2xl shadow p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <FaUserCircle className="text-2xl text-blue-400" />
                                <span className="font-semibold text-gray-800">Usuario {post}</span>
                                <span className="text-xs text-gray-400 ml-auto">Hace 1h</span>
                            </div>
                            <p className="text-gray-700">
                                Este es un ejemplo de publicación en el feed de Technet. ¡Personalízalo según tu necesidad!
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}