import { UserFilter } from "@/interfaces/users";
import { CollectorFormData } from "../schemas/userSchema";

export const createUser = async (userData: CollectorFormData) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(API_URL + "/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error al crear usuario");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};
export const updateUser = async (userData: CollectorFormData) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(
      `${API_URL}/api/users/${userData.identifyNumber}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error al actualizar usuario con ID ${userData.identifyNumber}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error en updateUser:", error);
  }
};
export const fetchUsers = async (filters?: UserFilter) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  let queryParams = "";
  if (
    filters &&
    filters.identifyNumber &&
    filters.identifyTypeId &&
    filters.personTypeId
  ) {
    queryParams = new URLSearchParams({ ...filters }).toString();
  }
  try {
    const response = await fetch(`${API_URL}/api/users?${queryParams}`);

    if (!response.ok) {
      throw new Error("Error al traer a los usuarios");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};
export const fetchUser = async (filters?: UserFilter) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  let queryParams = "";
  if (
    filters &&
    filters.identifyNumber &&
    filters.identifyTypeId &&
    filters.personTypeId
  ) {
    queryParams = new URLSearchParams({ ...filters }).toString();
  }
  try {
    const response = await fetch(
      `${API_URL}/api/users/${filters?.identifyNumber}?${queryParams}`
    );

    if (!response.ok) {
      throw new Error("Error al traer a los usuarios");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};
