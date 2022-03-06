import AsyncStorage from "@react-native-async-storage/async-storage";
import EncryptedStorage from "react-native-encrypted-storage";
import { AuthStorage, AuthTokens } from "./types/auth";
import { getTodaysTimestampInSeconds } from "./utils";

const isAppIntroPassed = async () => {
  let introPassed: string | null = null;

  try {
    introPassed = await AsyncStorage.getItem("intro_passed");
  } catch (error) {
    return false
  }
  return true
}

const retrieveUserSessionFromStorage = async () => {
  let session: string | null = null;

  try {
    session = await EncryptedStorage.getItem("user_session");
  } catch (error) {
    return undefined
  }
  return (session ? JSON.parse(session) as AuthStorage : undefined)
}

const storeUserSessionToStorage = async (authTokens: AuthTokens) => {
  const authStorage: AuthStorage = {
    access_token: authTokens.access_token,
    refresh_token: authTokens.refresh_token,
    expire_timestamp: getTodaysTimestampInSeconds() + authTokens.expires_in,
    token_type: "Bearer"
  }
  try {
    await EncryptedStorage.setItem(
      "user_session",
      JSON.stringify(authStorage)
    );
  } catch (error) {
    console.error(error)
    return false
  }
  return true
}

export { isAppIntroPassed, retrieveUserSessionFromStorage, storeUserSessionToStorage }