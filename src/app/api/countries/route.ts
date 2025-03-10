import { prisma } from "@/libs/prismaInstance";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const countries = await prisma.country.findMany({
      include: { states: { include: { cities: true } } },
    });
    return NextResponse.json(countries, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error en el servidor" },
      { status: 500 }
    );
  }
};
