import { atom } from "recoil"
import servicesMock from "../../mock/services"

const servicesAtom = atom({
  key: "services",
  default: servicesMock
})

export default servicesAtom
