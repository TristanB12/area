import { SetterOrUpdater } from "recoil"
import api from "./api"
import { storeUserSessionToStorage } from "./storage"
import { AuthState, AuthTokens } from "./types/auth"

const getTodaysTimestampInSeconds = () => Math.round((new Date()).getTime() / 1000)

const signIn = async (authTokens: AuthTokens, setAuth: SetterOrUpdater<AuthState>) => {
  await storeUserSessionToStorage(authTokens)
  api.tokens.setAccessToken(authTokens.access_token)
  setAuth(auth => ({
    ...auth,
    isSignedIn: true,
    isSignout: false,
  }))
}

export { getTodaysTimestampInSeconds, signIn }