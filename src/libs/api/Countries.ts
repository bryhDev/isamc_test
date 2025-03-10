export async function fetchCountries() {
  try {
    const response = await fetch("http://localhost:3000/api/countries");
    if (!response.ok) {
      throw new Error(`Error al obtener los países: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en fetchCountries:", error);
    return [];
  }
}
