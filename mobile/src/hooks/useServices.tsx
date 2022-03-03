import { useQuery, UseQueryOptions } from "react-query"
import api, { APIResponse } from "../api"
import { Service } from "../types";

const useServices = (
  options?: Omit<UseQueryOptions<APIResponse<Service[]>>, 'queryKey' | 'queryFn'>
) => useQuery<APIResponse<Service[]>>(
  "services",
  async () => await api.services.get(),
  options
);


export default useServices