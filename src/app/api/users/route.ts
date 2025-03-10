import { prisma } from "@/libs/prismaInstance";
import { CollectorFormData, userSchema } from "@/libs/schemas/userSchema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const identifyTypeId = searchParams.get("identifyTypeId") ?? undefined;
    const personTypeId = searchParams.get("personTypeId") ?? undefined;
    const identifyNumber = searchParams.get("identifyNumber") ?? undefined;
    console.log(searchParams);

    if (
      (identifyTypeId && Number.isNaN(identifyTypeId)) ||
      (personTypeId && Number.isNaN(personTypeId))
    ) {
      return NextResponse.json(
        { message: "El identifyTypeId debe ser un número válido" },
        { status: 400 }
      );
    }

    const identifyTypeIdInt = identifyTypeId
      ? parseInt(identifyTypeId)
      : undefined;
    const personTypeIdInt = personTypeId ? parseInt(personTypeId) : undefined;

    const filters = {
      identifyTypeId: identifyTypeIdInt,
      personTypeId: personTypeIdInt,
      identifyNumber,
    };
    const users = await prisma.user.findMany({
      include: {
        city: true,
        businessType: true,
        identifyType: true,
        personType: true,
      },
      where: { ...filters },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error en el servidor" },
      { status: 500 }
    );
  }
};
export const POST = async (req: Request) => {
  try {
    const body: CollectorFormData = await req.json();

    // Validar con Zod
    const validation = userSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Datos inválidos", errors: validation.error.format() },
        { status: 400 }
      );
    }
    const newUser = await prisma.user.create({
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
        identifyNumber: body.identifyNumber,
        identifyTypeId: body.identifyTypeId,
        personTypeId: body.personTypeId,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error en POST /users:", error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
};
