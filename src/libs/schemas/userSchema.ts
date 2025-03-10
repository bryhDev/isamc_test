import { z } from "zod";
export type CollectorFormData = z.infer<typeof userSchema>;

export const userSchema = z
  .object({
    countryId: z.number().min(1, "Debe seleccionar un país"),
    stateId: z.number().min(1, "Debe seleccionar un departamento"),
    cityId: z.number().min(1, "Debe seleccionar un municipio"),
    verificationDigit: z.string().length(1, "Debe ser un solo dígito"),
    businessName: z.string().optional(),
    tradeName: z.string().optional(),
    address: z.string().min(5, "La dirección es obligatoria"),

    identifyNumber: z
      .string()
      .min(5, "El número de identificación es obligatorio"),
    identifyTypeId: z
      .number()
      .min(1, "Debe seleccionar un tipo de identificación"),
    personTypeId: z.number().min(1, "Debe seleccionar un tipo de persona"),

    companyTypeId: z.number().min(1, "Debe seleccionar un tipo de empresa"),
    email: z.string().email("Debe ser un correo válido"),
    confirmEmail: z.string().email("Debe ser un correo válido"),
    phone: z.string().regex(/^\d{10}$/, "Debe ser un número de 10 dígitos"),
    confirmPhone: z
      .string()
      .regex(/^\d{10}$/, "Debe ser un número de 10 dígitos"),
    filledBy: z.string().min(2, "Campo obligatorio"),
    position: z.string().min(2, "Campo obligatorio"),
    department: z.string().min(2, "Campo obligatorio"),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Los correos no coinciden",
    path: ["confirmEmail"],
  })
  .refine((data) => data.phone === data.confirmPhone, {
    message: "Los números de celular no coinciden",
    path: ["confirmPhone"],
  });
