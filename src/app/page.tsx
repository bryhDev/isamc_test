import { fetchCountries } from "@/libs/api/Countries";
import CollectorScreen from "../Components/Screens/CollectorScreen";
import { fetchBusinessType } from "@/libs/api/businessType";
import { fetchIdentifyTypes } from "@/libs/api/identifyType";
import { fetchPersonTypes } from "@/libs/api/personType";

export default async function Home() {
  const countries = await fetchCountries();
  const businessType = await fetchBusinessType();
  const identifyType = await fetchIdentifyTypes();
  const personType = await fetchPersonTypes();
  return (
    <CollectorScreen
      countries={countries}
      businessType={businessType}
      identifyType={identifyType}
      personType={personType}
    />
  );
}
