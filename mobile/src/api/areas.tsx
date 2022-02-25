import axiosAPI from "./config";
import axios from "axios";
import Area from '../types'

async function createArea(area: Area) {
  const { data } = await axiosAPI.post("/areas", { area: area })
  return data
}

async function getAreas() {
  const { data } = await axiosAPI.get("/areas")
  return data
}

async function editArea(area: Area) {
  const { data } = await axiosAPI.patch("/areas", { area: area })
  return data
}

async function deleteArea(area: Area) {
  const { data } = await axiosAPI.delete(`/areas?id=${area._id}`)
  return data
}

export { createArea, getAreas, editArea, deleteArea }