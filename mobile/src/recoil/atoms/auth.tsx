import { atom } from "recoil"
import { AuthState } from '../../types/auth'

const authAtom = atom({
  key: "auth",
  default: {
    isLoading: true,
    isSignedIn: false,
    isSignout: false,
    isFirstTimeUsingApp: true
  } as AuthState
})

export default authAtom
