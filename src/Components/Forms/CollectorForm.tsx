"use client";
import { BusinessType } from "@/interfaces/businessType";
import { Country } from "@/interfaces/countries";
import { PersonType } from "@/interfaces/personType";
import { User } from "@/interfaces/users";
import { createUser, updateUser } from "@/libs/api/users";
import { CollectorFormData, userSchema } from "@/libs/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IdentifyType } from "../../interfaces/identifyType";

interface Props {
  countries: Country[];
  businessTypes: BusinessType[];
  personTypes: PersonType[];
  identifyTypes: IdentifyType[];
  user: User | null;
}
export default function CollectorForm({
  countries,
  businessTypes: businessTypes,
  identifyTypes: identifyType,
  personTypes: personType,
  user = null,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      identifyNumber: "",
      verificationDigit: "",
      address: "",
      email: "",
      confirmEmail: "",
      phone: "",
      confirmPhone: "",
      businessName: "",
      department: "",
      position: "",
      filledBy: "",
    },
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [userState, setUserState] = useState<User | null>(
    user ? { ...user } : null
  );
  console.log(loading);

  const locationsIdsFromCity = useCallback(
    (cityId: number) => {
      let foundCountryId;
      let foundStateId;
      for (const country of countries) {
        for (const state of country.states) {
          const city = state.cities.find((c) => c.id === cityId);
          if (city) {
            foundStateId = state.id;
            foundCountryId = country.id;
            return { foundStateId, foundCountryId };
          }
        }
        if (foundCountryId) break; // Romper bucles si ya encontramos los valores
      }
    },
    [countries]
  );
  useEffect(() => {
    setUserState(user ? { ...user } : null);

    return () => {};
  }, [user]);

  useEffect(() => {
    console.log("entre", userState);
    const userLocation = locationsIdsFromCity(userState?.cityId ?? 0);
    if (userState) {
      reset({
        identifyTypeId: userState?.identifyTypeId,
        personTypeId: userState?.personTypeId,
        identifyNumber: userState?.identifyNumber,
        cityId: userState?.cityId,
        verificationDigit: userState?.verificationDigit,
        address: userState?.address,
        companyTypeId: userState?.businessTypeId,
        email: userState?.email,
        confirmEmail: userState?.email,
        phone: userState?.phone,
        confirmPhone: userState?.phone,
        businessName: userState?.company,
        department: userState?.department,
        position: userState?.position,
        countryId: userLocation?.foundCountryId,
        stateId: userLocation?.foundStateId,
        filledBy: userState?.name,
      });
    }
    return () => {
      reset();
    };
  }, [locationsIdsFromCity, reset, userState]);

  const countryId = watch("countryId");
  const stateId = watch("stateId");

  const filteredStates = useMemo(() => {
    return countries.find((c) => c.id === Number(countryId))?.states || [];
  }, [countryId, countries]);

  // Obtener las ciudades del estado seleccionado
  const filteredCities = useMemo(() => {
    return filteredStates.find((s) => s.id === Number(stateId))?.cities || [];
  }, [stateId, filteredStates]);

  const onSubmit = async (data: CollectorFormData) => {
    setLoading(true);
    try {
      if (userState) {
        updateUser(data);
        return;
      }
      createUser(data);
      // Aquí enviarías la data a tu API
    } catch (error) {
      console.error("Error al enviar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-4"
      >
        {/* Tipo de Identificación */}
        <div>
          <select
            {...register("identifyTypeId", { valueAsNumber: true })}
            className="w-full border rounded py-2 px-3 mb-2"
            disabled={!!userState}
          >
            <option value="">Seleccione un tipo de identificación</option>
            {identifyType.map((idType) => (
              <option key={idType.id} value={idType.id}>
                {idType.name}
              </option>
            ))}
          </select>
          {errors.identifyTypeId && (
            <p className="text-red-500 text-sm">
              {errors.identifyTypeId.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("identifyNumber")}
            placeholder="Número de Identificación *"
            className="w-full border rounded py-2 px-3 mb-2"
            disabled={!!userState}
          />
          {errors.identifyNumber && (
            <p className="text-red-500 text-sm">
              {errors.identifyNumber.message}
            </p>
          )}
        </div>
        {/* Tipo de Persona */}
        <div>
          <select
            {...register("personTypeId", { valueAsNumber: true })}
            className="w-full border rounded py-2 px-3 mb-2"
            disabled={!!userState}
          >
            <option value="">Seleccione un tipo de persona</option>
            {personType.map((perType) => (
              <option key={perType.id} value={perType.id}>
                {perType.name}
              </option>
            ))}
          </select>
          {errors.personTypeId && (
            <p className="text-red-500 text-sm">
              {errors.personTypeId.message}
            </p>
          )}
        </div>
        {/* País */}
        <div>
          <select
            {...register("countryId", { valueAsNumber: true })}
            className="w-full border rounded py-2 px-3 mb-2"
          >
            <option value="">Seleccione un país</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.countryId && (
            <p className="text-red-500 text-sm">{errors.countryId.message}</p>
          )}
        </div>

        {/* Departamento */}
        <div>
          <select
            {...register("stateId", { valueAsNumber: true })}
            className="w-full border rounded py-2 px-3 mb-2"
            disabled={!countryId}
          >
            <option value="">Seleccione un departamento</option>
            {filteredStates.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.stateId && (
            <p className="text-red-500 text-sm">{errors.stateId.message}</p>
          )}
        </div>

        {/* Municipio */}
        <div>
          <select
            {...register("cityId", { valueAsNumber: true })}
            className="w-full border rounded py-2 px-3 mb-2"
            disabled={!stateId}
          >
            <option value="">Seleccione un municipio</option>
            {filteredCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {errors.cityId && (
            <p className="text-red-500 text-sm">{errors.cityId.message}</p>
          )}
        </div>

        {/* Dígito de verificación */}
        <div>
          <input
            {...register("verificationDigit")}
            type="text"
            placeholder="Dígito de verificación *"
            className="w-full border rounded py-2 px-3 mb-2"
          />
          {errors.verificationDigit && (
            <p className="text-red-500 text-sm">
              {errors.verificationDigit.message}
            </p>
          )}
        </div>

        {/* Razón Social */}
        <div>
          <input
            {...register("businessName")}
            type="text"
            placeholder="Razón Social"
            className="w-full border rounded py-2 px-3 mb-2"
          />
        </div>

        {/* Dirección */}
        <div>
          <input
            {...register("address")}
            type="text"
            placeholder="Dirección *"
            className="w-full border rounded py-2 px-3 mb-2"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* Tipo de Empresa */}
        <div>
          <select
            {...register("companyTypeId", { valueAsNumber: true })}
            className="w-full border rounded py-2 px-3 mb-2"
          >
            <option value="">Seleccione un tipo de empresa</option>
            {businessTypes.map((bt) => (
              <option key={bt.id} value={bt.id}>
                {bt.name}
              </option>
            ))}
          </select>
          {errors.companyTypeId && (
            <p className="text-red-500 text-sm">
              {errors.companyTypeId.message}
            </p>
          )}
        </div>

        {/* Correo Electrónico */}
        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Correo Electrónico *"
            className="w-full border rounded py-2 px-3 mb-2"
            disabled={!!userState}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Confirmar Correo Electrónico */}
        <div>
          <input
            {...register("confirmEmail")}
            type="email"
            placeholder="Confirmar correo electrónico *"
            className="w-full border rounded py-2 px-3 mb-2"
            disabled={!!userState}
          />
          {errors.confirmEmail && (
            <p className="text-red-500 text-sm">
              {errors.confirmEmail.message}
            </p>
          )}
        </div>

        {/* Número de Celular */}
        <div>
          <input
            {...register("phone")}
            type="tel"
            placeholder="Número de Celular *"
            className="w-full border rounded py-2 px-3 mb-2"
            disabled={!!userState}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Confirmar Número de Celular */}
        <div>
          <input
            {...register("confirmPhone")}
            type="tel"
            placeholder="Confirmar número de celular *"
            className="w-full border rounded py-2 px-3 mb-2"
            disabled={!!userState}
          />
          {errors.confirmPhone && (
            <p className="text-red-500 text-sm">
              {errors.confirmPhone.message}
            </p>
          )}
        </div>

        {/* Quien diligencia el formulario */}
        <div>
          <input
            {...register("filledBy")}
            type="text"
            placeholder="Quien diligencia el formulario *"
            className="w-full border rounded py-2 px-3 mb-2"
          />
          {errors.filledBy && (
            <p className="text-red-500 text-sm">{errors.filledBy.message}</p>
          )}
        </div>

        {/* Cargo */}
        <div>
          <input
            {...register("position")}
            type="text"
            placeholder="Cargo *"
            className="w-full border rounded py-2 px-3 mb-2"
          />
          {errors.position && (
            <p className="text-red-500 text-sm">{errors.position.message}</p>
          )}
        </div>

        {/* Área */}
        <div>
          <input
            {...register("department")}
            type="text"
            placeholder="Área *"
            className="w-full border rounded py-2 px-3 mb-2"
          />
          {errors.department && (
            <p className="text-red-500 text-sm">{errors.department.message}</p>
          )}
        </div>
      </form>

      {/* Botones */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        <button
          type="submit"
          className="w-full bg-orange-400 text-white py-3 rounded hover:bg-orange-500 transition"
          onClick={() => formRef.current?.requestSubmit()}
        >
          {userState ? "Actualizar" : "Guardar"}
        </button>
        <button
          className="w-full bg-orange-400 text-white py-3 rounded hover:bg-orange-500 transition"
          onClick={(e) => {
            e.preventDefault(); // Evitar cualquier comportamiento inesperado
            setUserState(null); // Limpiar usuario primero
            reset({
              identifyNumber: "",
              verificationDigit: "",
              address: "",
              email: "",
              confirmEmail: "",
              phone: "",
              confirmPhone: "",
              businessName: "",
              department: "",
              position: "",
              filledBy: "",
              countryId: undefined,
              stateId: undefined,
              cityId: undefined,
              identifyTypeId: undefined,
              personTypeId: undefined,
              companyTypeId: undefined,
            });
          }}
        >
          limpiar
        </button>
      </div>
    </section>
  );
}
