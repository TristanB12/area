import { useQuery, UseQueryOptions } from "react-query"
import api, { APIResponse } from "../api"

const useAreas = (
  options?: Omit<UseQueryOptions<APIResponse<any>>, 'queryKey' | 'queryFn'>
) => useQuery<APIResponse<any>>(
  "areas",
  async () => await api.areas.get(),
  options
);


export default useAreas