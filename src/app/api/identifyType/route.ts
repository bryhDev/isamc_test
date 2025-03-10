import { prisma } from "@/libs/prismaInstance";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const identifyTypes = await prisma.identifyType.findMany();
    return NextResponse.json(identifyTypes, { status: 200 });
  } catch (error) {
    console.error("Error en GET /identify-types:", error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
};
