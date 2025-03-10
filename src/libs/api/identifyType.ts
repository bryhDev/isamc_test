export async function fetchIdentifyTypes() {
  try {
    const response = await fetch("http://localhost:3000/api/identifyType");
    if (!response.ok)
      throw new Error("Error al obtener tipos de identificación");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
