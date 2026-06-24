import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user || null;
};

export const getUserToken = async () => {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    return token ? token : "";
  } catch (error) {
    return "";
  }
};
