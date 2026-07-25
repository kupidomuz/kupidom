import { cookies } from "next/headers";


export async function getCurrentUser() {

  const cookieStore = await cookies();

  const user =
    cookieStore.get("user")?.value;


  if (!user) {
    return null;
  }


  return JSON.parse(user);

}