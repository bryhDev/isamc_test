export async function fetchIdentifyTypes() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${API_URL}/api/identifyType`);
    if (!response.ok)
      throw new Error("Error al obtener tipos de identificación");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
