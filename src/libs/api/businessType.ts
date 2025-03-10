export async function fetchBusinessType() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${API_URL}/api/businessType`);
    if (!response.ok) {
      throw new Error(`Error al obtener los países: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en fetchBusinessType:", error);
    return [];
  }
}
