import { storeUserSessionToStorage } from "../storage";
import { AuthTokens } from "./auth";
import axiosAPI from "./config";

function setAccessToken(access_token: string) {
  axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
}

const refreshAccessToken = async (refresh_token: string) => {
  try {
    const { data } = await axiosAPI.request<AuthTokens>({
      method: "GET",
      url: "/token/refresh",
      params: {
        refresh_token
      }
    })
    if (data) {
      setAccessToken(data.access_token)
      await storeUserSessionToStorage(data)
    }
  } catch (error) {
    console.log(error)
    return false
  }
  return true
}

const verifyAccessToken = async (access_token: string) => axiosAPI({
  method: "GET",
  url: "/token/verify",
  headers: {
    "authorization": `Bearer ${access_token}`
  }
})

export { setAccessToken, refreshAccessToken, verifyAccessToken }