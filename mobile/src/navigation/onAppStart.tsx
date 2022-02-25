import { AuthState, AuthStorage } from "../types/auth";
import { SetterOrUpdater } from "recoil";
import { StorageManager, ColorMode } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EncryptedStorage from "react-native-encrypted-storage";
import api from "../api";

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem("@color-mode");
      return val === "dark" ? "dark" : "light";
    } catch (e) {
      return "light";
    }
  },
  set: async (value: ColorMode) => {
    try {
      if (value) {
        await AsyncStorage.setItem("@color-mode", value);
      }
    } catch (e) {
      console.log(e);
    }
  },
};

const retrieveAuthFromStorage = async (setAuth: SetterOrUpdater<AuthState>) => {
  let introPassed: string | null = null;
  let session: string | null = null;

  try {
    introPassed = await AsyncStorage.getItem("intro_passed");
  } catch (error) {
    introPassed = null
  }
  try {
    session = await EncryptedStorage.getItem("user_session");
  } catch (error) {
    session = null
  }
  if (!session) {
    setAuth(auth => ({
      ...auth,
      isFirstTimeUsingApp: (introPassed === null),
      isLoading: false
    }))
    return
  }
  const storage: AuthStorage = JSON.parse(session)
  // TODO: app hangs if no internet, change that
  const { error } = await api.tokens.verify(storage.access_token)
  if (!error) {
    api.tokens.setAccessToken(storage.access_token)
  } else {
    await api.tokens.refresh(storage.refresh_token)
  }
  setAuth(auth => ({
    ...auth,
    isFirstTimeUsingApp: (introPassed === null),
    isLoading: false,
    email: storage.email,
    access_token: storage.access_token,
    refresh_token: storage.access_token
  }))
};

export { retrieveAuthFromStorage, colorModeManager }