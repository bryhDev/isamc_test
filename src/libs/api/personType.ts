export async function fetchPersonTypes() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${API_URL}/api/personType`);
    if (!response.ok) throw new Error("Error al obtener tipos de persona");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
