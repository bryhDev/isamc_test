import { BusinessType } from "@/interfaces/businessType";
import { City } from "@/interfaces/countries";
import { IdentifyType } from "./identifyType";
import { PersonType } from "./personType";
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  identifyNumber: string;
  isActive: boolean;
  createdAt: string;
  cityId: number;
  businessTypeId: number;
  identifyTypeId: number;
  personTypeId: number;
  position: string;
  department: string;
  verificationDigit: string;
  city: City;
  businessType: BusinessType;
  identifyType: IdentifyType;
  personType: PersonType;
}
export interface UserFilter {
  identifyTypeId?: string;
  personTypeId?: string;
  identifyNumber?: string;
}
