import CollectorTableScreen from "@/Components/Screens/CollectorTableScreen";
import { fetchIdentifyTypes } from "@/libs/api/identifyType";
import { fetchPersonTypes } from "@/libs/api/personType";
import { fetchUsers } from "@/libs/api/users";

async function page() {
  const users = await fetchUsers();
  const identifyType = await fetchIdentifyTypes();
  const personType = await fetchPersonTypes();
  return (
    <CollectorTableScreen
      users={users}
      identifyType={identifyType}
      personType={personType}
    />
  );
}

export default page;
