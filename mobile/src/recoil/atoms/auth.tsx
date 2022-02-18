import { atom } from "recoil"
import { AuthState } from '../../types/auth'

const authAtom = atom({
  key: "auth",
  default: {
    isLoading: true,
    isSignout: false,
    isFirstTimeUsingApp: true,
    email: "",
    access_token: "",
    refresh_token: ""
  } as AuthState
})

export default authAtom
