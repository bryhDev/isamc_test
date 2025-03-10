import Link from "next/link";
import React from "react";

function UserSideBar() {
  return (
    <aside className="w-64 p-4 bg-orange-50 border-r border-orange-200">
      {/* Perfil del usuario */}
      <section className="bg-white p-4 rounded-lg shadow-sm mb-4 text-center">
        <div className="w-16 h-16 bg-sky-100 rounded-full mx-auto mb-2 flex items-center justify-center">
          <div className="text-sky-400 text-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21v-2a7 7 0 0 0-14 0v2" />
            </svg>
          </div>
        </div>
        <h2 className="font-medium text-gray-800">Usuario Interno</h2>
      </section>

      {/* Opciones de usuario */}
      <nav>
        <ul>
          <li>
            <button className="w-full bg-orange-400 text-white py-2 px-4 rounded-md mb-2 hover:bg-orange-500 transition">
              Perfil
            </button>
          </li>
          <li>
            <button className="w-full bg-orange-50 text-gray-700 py-2 px-4 rounded-md mb-6 border border-orange-300 hover:bg-orange-100 transition">
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>

      {/* Sección de Gestor de Recaudo */}
      <section>
        <h3 className="bg-orange-400 text-white py-2 px-4 rounded-md mb-2">
          Gestor de Recaudo
        </h3>
        <ul>
          <li>
            <Link
              href={"/collectors"}
              className="w-full bg-orange-50 text-gray-700 py-2 px-4 rounded-md border border-orange-300 hover:bg-orange-100 transition"
            >
              Identificación de usuarios
            </Link>
          </li>
        </ul>
      </section>
    </aside>
  );
}

export default UserSideBar;
