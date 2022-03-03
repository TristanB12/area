import { useQuery, UseQueryOptions } from "react-query"
import api, { APIResponse } from "../api"
import { Service } from "../types";

const useServices = (
  mode: "" | "offline" = "",
  options?: Omit<UseQueryOptions<APIResponse<Service[]>>, 'queryKey' | 'queryFn'>
) => useQuery<APIResponse<Service[]>>(
  "services",
  async () => await api.services.get(mode),
  options
);


export default useServices