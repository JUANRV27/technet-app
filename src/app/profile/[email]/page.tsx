import { FaUserCircle } from "react-icons/fa";

export default async function PublicProfilePage({ params }: { params: { email: string } }) {
    // Llama a tu API o consulta directa a la base de datos para obtener el usuario por username
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/public-profile?username=${params.email}`, { cache: "no-store" });
    const data = await res.json();
    const user = data.user;

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <span className="text-red-500">Usuario no encontrado.</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-xl flex flex-col items-center">
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt="Avatar"
                        className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                ) : (
                    <FaUserCircle className="text-gray-400 text-[8rem] mb-4" />
                )}
                <h2 className="font-kdam text-3xl text-blue-700">{user.nombre}</h2>
                <span className="text-gray-500 mb-2">{user.biografia}</span>
                <p className="text-gray-700 text-center">{user.intereses}</p>
            </div>
        </div>
    );
}