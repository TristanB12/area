import { useQuery } from "react-query"
import api from "../api"

const useProfile = () => useQuery("user", async () => await api.user.get());

export default useProfile