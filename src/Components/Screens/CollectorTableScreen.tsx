"use client";
import { User, UserFilter } from "@/interfaces/users";
import React, { useMemo, useState } from "react";
import UsersTable from "../Tables/UsersTable";
import Link from "next/link";
import UserSearchBar from "../SearchBars/UserSearchBar";
import { PersonType } from "@/interfaces/personType";
import { IdentifyType } from "@/interfaces/identifyType";
interface Props {
  users: User[];
  personType: PersonType[];
  identifyType: IdentifyType[];
}
function CollectorTableScreen({
  users = [],
  identifyType = [],
  personType = [],
}: Props) {
  const [filters, setFilters] = useState<UserFilter>({
    personTypeId: "",
    identifyTypeId: "",
    identifyNumber: "",
  });
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return (
        (filters.personTypeId === "" ||
          user.personTypeId.toString() === filters.personTypeId) &&
        (filters.identifyTypeId === "" ||
          user.identifyTypeId.toString() === filters.identifyTypeId) &&
        (filters.identifyNumber === "" ||
          user.identifyNumber.includes(filters.identifyNumber ?? ""))
      );
    });
  }, [filters, users]);
  return (
    <div className="mb-4">
      <UserSearchBar
        setSearchedUser={setFilters}
        identifyType={identifyType}
        personType={personType}
      />
      <header className="flex justify-between items-center mb-2">
        <h2 className="bg-[#f9a826] text-white py-1 px-4 rounded-md">
          Registro de recaudadores pre-identificados
        </h2>
        <Link
          href={"/"}
          className="bg-[#f9a826] text-white py-1 px-4 rounded-md flex items-center"
        >
          <span className="mr-1">Crear Nuevo</span>
          {/* Icono de impresión */}
        </Link>
      </header>
      <UsersTable users={filteredUsers} />
    </div>
  );
}

export default CollectorTableScreen;
