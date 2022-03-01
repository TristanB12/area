import { AuthState, AuthStorage } from "../types/auth";
import { SetterOrUpdater } from "recoil";
import { StorageManager, ColorMode } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";
import { isAppIntroPassed, retrieveUserSessionFromStorage, } from "../storage";

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
  const introIsPassed = await isAppIntroPassed()
  const session = await retrieveUserSessionFromStorage()

  api.tokens.setAccessToken(session?.access_token || "")
  setAuth(auth => ({
    ...auth,
    isFirstTimeUsingApp: (!introIsPassed),
    isLoading: false,
    email: session?.email || auth.email,
    access_token: session?.access_token || auth.access_token,
    refresh_token: session?.refresh_token || auth.refresh_token
  }))
};

export { retrieveAuthFromStorage, colorModeManager }