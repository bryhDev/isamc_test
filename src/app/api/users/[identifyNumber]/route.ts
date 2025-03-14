import { prisma } from "@/libs/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ identifyNumber: string }> }
) => {
  const { identifyNumber } = await params;

  try {
    const user = await prisma.user.findFirst({
      include: {
        city: true,
        businessType: true,
        identifyType: true,
        personType: true,
      },
      where: { identifyNumber: identifyNumber },
    });
    if (!user) {
      return NextResponse.json(
        { message: "No se encontro el usuario" },
        { status: 404 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error en el servidor" },
      { status: 500 }
    );
  }
};
export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ identifyNumber: string }> }
) => {
  try {
    const body = await request.json();
    const { identifyNumber } = await params;

    if (!identifyNumber) {
      return NextResponse.json(
        { message: "El ID del usuario es obligatorio" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { identifyNumber: identifyNumber },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar el usuario en la base de datos
    const updatedUser = await prisma.user.update({
      where: { identifyNumber: identifyNumber },
      data: {
        name: body.filledBy,
        email: body.email,
        phone: body.phone,
        company: body.businessName,
        businessTypeId: body.companyTypeId,
        cityId: body.cityId,
        position: body.position,
        address: body.address,
        department: body.department,
        verificationDigit: body.verificationDigit,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error en PUT /users/[id]:", error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
};
