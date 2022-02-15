import { atom } from "recoil"
import Area from "../../types"

const editedAreaAtom = atom({
  key: "editedArea",
  default: {
    _id: 0,
    title: "",
    description: "",
    action: undefined,
    reaction: undefined
  } as Area
})

export default editedAreaAtom
