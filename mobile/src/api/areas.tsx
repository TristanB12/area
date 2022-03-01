import axiosAPI from "./config";
import Area from '../types'

const createArea = async (area: Area) => axiosAPI({
  method: "POST",
  url: "/area",
  data: { area }
})

const getAreas = async () => axiosAPI({
  method: "GET",
  url: "/area"
})

const editArea = async (area: Area) => axiosAPI({
  method: "PATCH",
  url: "/area",
  data: { area }
})

const deleteArea = async (area: Area) => axiosAPI({
  method: "DELETE",
  url: "/areas",
  params: {
    id: area.id
  }
})

export { createArea, getAreas, editArea, deleteArea }