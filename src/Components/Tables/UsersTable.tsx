import React from "react";
import { User } from "@/interfaces/users";
interface Props {
  users: User[];
}
function UsersTable({ users }: Props) {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-md bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="text-xs text-gray-700 bg-gray-100">
            <th className="px-4 py-2 border-r">#</th>
            <th className="px-4 py-2 border-r">Fecha</th>
            <th className="px-4 py-2 border-r">N°T</th>
            <th className="px-4 py-2 border-r">Razón Social</th>
            <th className="px-4 py-2 border-r">Naturaleza de la empresa</th>
            <th className="px-4 py-2 border-r">Tipo de empresa (Jurídica)</th>
            <th className="px-4 py-2 border-r">Correo Electrónico</th>
            <th className="px-4 py-2 border-r">Número de Celular</th>
            <th className="px-4 py-2 border-r">
              Nombre de representante legal
            </th>
            <th className="px-4 py-2 border-r">Estado</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={user.id} className="text-xs text-center">
              <td className="px-4 py-2 border-r">{index + 1}</td>
              <td className="px-4 py-2 border-r">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border-r">{user.identifyNumber}</td>
              <td className="px-4 py-2 border-r">{user.company}</td>
              <td className="px-4 py-2 border-r">{user.personType.name}</td>
              <td className="px-4 py-2 border-r">{user.businessType.name}</td>
              <td className="px-4 py-2 border-r">{user.email}</td>
              <td className="px-4 py-2 border-r">{user.phone}</td>
              <td className="px-4 py-2 border-r">{user.name}</td>
              <td className="px-4 py-2 border-r">
                <span
                  className={`px-2 py-1 rounded-md text-white ${
                    user.isActive ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {user.isActive ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-4 py-2 flex space-x-1 justify-center">
                <button className="p-1 bg-green-500 text-white rounded-full">
                  ✅
                </button>
                <button className="p-1 bg-red-500 text-white rounded-full">
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
