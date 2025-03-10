export async function fetchPersonTypes() {
  try {
    const response = await fetch("http://localhost:3000/api/personType");
    if (!response.ok) throw new Error("Error al obtener tipos de persona");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
