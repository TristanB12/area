type ServiceAction = {
  service: string,
  logoUri: string
  title: string,
  config?: object
}

type Area = {
  _id: number,
  title: string,
  description: string,
  action: ServiceAction
  reaction: ServiceAction
}

export type { ServiceAction }
export default Area