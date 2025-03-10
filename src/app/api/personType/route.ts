import { prisma } from "@/libs/prismaInstance";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const personTypes = await prisma.personType.findMany();
    return NextResponse.json(personTypes, { status: 200 });
  } catch (error) {
    console.error("Error en GET /person-types:", error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
};
