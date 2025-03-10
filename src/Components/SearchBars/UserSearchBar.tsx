import { PersonType } from "@/interfaces/personType";
import { IdentifyType } from "@/interfaces/identifyType";
import { useState } from "react";
import { UserFilter } from "@/interfaces/users";

interface Props {
  setSearchedUser: React.Dispatch<React.SetStateAction<UserFilter>>;
  personType: PersonType[];
  identifyType: IdentifyType[];
}

function UserSearchBar({
  setSearchedUser,
  personType: personTypes,
  identifyType: identifyTypes,
}: Props) {
  const [searchValues, setSearchValues] = useState({
    personTypeId: "",
    identifyTypeId: "",
    identifyNumber: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target;

    setSearchValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedUser(searchValues);
  };
  return (
    <section>
      <header className="bg-gradient-to-r from-orange-400 to-orange-500 text-white py-2 px-4 rounded-md mb-4">
        <h2>Identificación de usuarios recaudadores</h2>
      </header>
      <form className="grid grid-cols-12 gap-4 mb-6" onSubmit={handleSearch}>
        {/* Tipo de persona */}
        <div className="col-span-4">
          <label htmlFor="personTypeId" className="sr-only">
            Tipo de persona
          </label>
          <div className="relative">
            <select
              id="personTypeId"
              className="w-full border border-gray-300 rounded py-2 px-3 appearance-none pr-8"
              value={searchValues.personTypeId}
              onChange={handleChange}
            >
              <option>Tipo de persona: *</option>
              {personTypes.map((personType) => (
                <option key={personType.id} value={personType.id}>
                  {personType.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Tipo de documento */}
        <div className="col-span-4">
          <label htmlFor="identifyTypeId" className="sr-only">
            Tipo de documento
          </label>
          <div className="relative">
            <select
              id="identifyTypeId"
              className="w-full border border-gray-300 rounded py-2 px-3 appearance-none pr-8"
              value={searchValues.identifyTypeId}
              onChange={handleChange}
            >
              <option>Tipo de documento: * </option>
              {identifyTypes.map((identifyType) => (
                <option key={identifyType.id} value={identifyType.id}>
                  {identifyType.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Número de documento */}
        <div className="col-span-3">
          <label htmlFor="identifyNumber" className="sr-only">
            Número de documento
          </label>
          <input
            type="text"
            id="identifyNumber"
            placeholder="Número de documento: *"
            className="w-full border border-gray-300 rounded py-2 px-3"
            value={searchValues.identifyNumber}
            onChange={handleChange}
          />
        </div>

        {/* Botón de búsqueda */}
        <div className="col-span-1">
          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-500 transition flex items-center justify-center"
          >
            Buscar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>
    </section>
  );
}

export default UserSearchBar;
