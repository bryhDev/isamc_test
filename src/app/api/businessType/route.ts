import { prisma } from "@/libs/prismaInstance";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const businessType = await prisma.businessType.findMany({});
    return NextResponse.json(businessType, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error en el servidor" },
      { status: 500 }
    );
  }
};
