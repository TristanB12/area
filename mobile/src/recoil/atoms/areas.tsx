import { atom } from "recoil"
import areasMock from "../../mock/areas"

const areasAtom = atom({
  key: "areas",
  default: areasMock
})

export default areasAtom
