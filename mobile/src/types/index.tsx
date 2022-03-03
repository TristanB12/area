type ActionConfig = {
  display: string,
  example: any,
  value: any
}

type Action = {
  title: string,
  requiresUserAuth: boolean,
  config?: ActionConfig[]
}

type ServiceLink = {
  clientID: string,
  redirectUri: string,
  scope: string,
  authorizationEndpoint: string
}

type Service = {
  name: string,
  logoUri: string,
  link: ServiceLink,
  isLinked: boolean,
  actions: Action[],
  reactions: Action[]
}

type AuthService = Pick<Service, 'name' | 'logoUri'>

type ServiceAction = {
  service: Pick<Service, 'name' | 'logoUri'>
} & Action

type Area = {
  id: number,
  title: string,
  description: string,
  action: ServiceAction | undefined
  reaction: ServiceAction | undefined
}

export type { ActionConfig, Action, Service, AuthService, ServiceAction }
export default Area