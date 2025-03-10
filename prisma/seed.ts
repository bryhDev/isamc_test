import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Insertar países
  const colombia = await prisma.country.upsert({
    where: { name: "Colombia" },
    update: {},
    create: {
      name: "Colombia",
      phoneCode: 57,
    },
  });

  // Insertar estados/departamentos
  const antioquia = await prisma.state.upsert({
    where: { id: 1, name: "Antioquia" },
    update: {},
    create: {
      name: "Antioquia",
      countryId: colombia.id,
    },
  });

  // Insertar ciudades/municipios
  const medellin = await prisma.city.upsert({
    where: { id: 1, name: "Medellín" },
    update: {},
    create: {
      name: "Medellín",
      stateId: antioquia.id,
    },
  });

  // Insertar tipos de empresa
  const software = await prisma.businessType.upsert({
    where: { name: "Software" },
    update: {},
    create: { name: "Software" },
  });
  await prisma.$transaction([
    prisma.identifyType.upsert({
      where: { id: 1, name: "Cédula de Ciudadanía" },
      update: {},
      create: { id: 1, name: "Cédula de Ciudadanía" },
    }),
    prisma.identifyType.upsert({
      where: { id: 2, name: "Cédula de Extranjería" },
      update: {},
      create: { id: 2, name: "Cédula de Extranjería" },
    }),
    prisma.identifyType.upsert({
      where: { id: 3, name: "Pasaporte" },
      update: {},
      create: { id: 3, name: "Pasaporte" },
    }),
  ]);

  await prisma.$transaction([
    prisma.personType.upsert({
      where: { id: 1, name: "Persona Natural" },
      update: {},
      create: { id: 1, name: "Persona Natural" },
    }),
    prisma.personType.upsert({
      where: { id: 2, name: "Persona Jurídica" },
      update: {},
      create: { id: 2, name: "Persona Jurídica" },
    }),
  ]);

  // Insertar usuario
  await prisma.user.upsert({
    where: { email: "admin@isamc.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      phone: "3001234567",
      company: "Tech Corp",
      isActive: true,
      cityId: medellin.id,
      personTypeId: 1,
      identifyTypeId: 1,
      identifyNumber: "1072714086",
      address: "cll 13 #2a-13",
      businessTypeId: software.id,
      position: "Administrador",
      department: "TI",
      verificationDigit: "5",
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
