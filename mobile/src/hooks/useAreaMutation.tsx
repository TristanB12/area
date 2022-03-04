import { QueryClient, useMutation, useQueryClient } from "react-query"
import api from "../api"
import Area from "../types";

const useAreaMutation = (
  mutation: "create" | "edit" | "delete",
  queryClient: QueryClient
) => useMutation(
  async (area: Area) => (
    mutation === "create" ? await api.areas.create(area)
    : mutation === "edit" ? await api.areas.edit(area)
    : await api.areas.delete(area)
  ), {
    onSuccess: () => {
      queryClient.invalidateQueries("areas")
    }
  }
);


export default useAreaMutation