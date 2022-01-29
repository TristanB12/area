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
  action: ServiceAction | undefined
  reaction: ServiceAction | undefined
}

export type { ServiceAction }
export default Area