"use client";
import CollectorForm from "../Forms/CollectorForm";
import UserSearchBar from "../SearchBars/UserSearchBar";
import { Country } from "@/interfaces/countries";
import { BusinessType } from "@/interfaces/businessType";
import { useEffect, useState } from "react";
import { PersonType } from "@/interfaces/personType";
import { IdentifyType } from "@/interfaces/identifyType";
import { User, UserFilter } from "@/interfaces/users";
import { fetchUser } from "@/libs/api/users";

interface Props {
  countries: Country[];
  businessType: BusinessType[];
  personType: PersonType[];
  identifyType: IdentifyType[];
}
function CollectorScreen({
  countries = [],
  businessType = [],
  identifyType = [],
  personType = [],
}: Props) {
  const [filters, setFilters] = useState<UserFilter>({
    personTypeId: "",
    identifyTypeId: "",
    identifyNumber: "",
  });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(filters).then((value: User) => setUser(value));
    return () => {};
  }, [filters]);

  return (
    <section>
      {/* Encabezado */}
      <UserSearchBar
        setSearchedUser={setFilters}
        identifyType={identifyType}
        personType={personType}
      />
      <header className="bg-gradient-to-r from-orange-400 to-orange-500 text-white py-2 px-4 rounded-md mb-4">
        <h2>Información de usuarios recaudadores</h2>
      </header>

      <CollectorForm
        countries={countries}
        businessTypes={businessType}
        identifyTypes={identifyType}
        personTypes={personType}
        user={user}
      />
    </section>
  );
}

export default CollectorScreen;
