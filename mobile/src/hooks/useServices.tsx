import { useQuery, UseQueryOptions } from "react-query"
import api, { APIResponse } from "../api"

const useServices = (
  options?: Omit<UseQueryOptions<APIResponse<any>>, 'queryKey' | 'queryFn'>
) => useQuery<APIResponse<any>>(
  "services",
  async () => await api.services.get(),
  options
);


export default useServices