import { AuthTokens } from "./auth";
import axiosAPI from "./config";

function setAccessToken(access_token: string) {
  axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
}

async function refresh(refresh_token: string) {
  const params = new URLSearchParams({
    refresh_token: refresh_token,
  });
  const url = `token/refresh${params.toString()}`
  const { data } = await axiosAPI.get<AuthTokens>(url)
  if (data) {
    setAccessToken(data.access_token)
  }
  return data
}

async function verify(access_token: string) {
  const { data } = await axiosAPI.get("token/verify", {
    headers: {
      "authorization": `Bearer ${access_token}`
    }
  })
  return data
}

export { setAccessToken, refresh, verify }