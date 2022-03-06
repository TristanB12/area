import { Service } from "../types";
import axiosAPI from "./config";

type Profile = {
  email: string,
  email_verified: string,
  linked_services: Service[]
}

const getUser = async () => axiosAPI.request<Profile>({
  method: "GET",
  url: "/user"
})

export { getUser }