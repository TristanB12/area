type ServiceAction = {
  service: string,
  logoUri: string
  title: string,
  config?: object
}

type Area = {
  title: string,
  description: string,
  action: ServiceAction
  reaction: ServiceAction
}

export type { ServiceAction }
export default Area