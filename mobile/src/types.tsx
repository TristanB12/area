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

type Service = {
  name: string,
  logoUri: string,
  isAuth: boolean,
  actions: Action[],
  reactions: Action[]
}

type AuthService = Pick<Service, 'name' | 'logoUri'>

type ServiceAction = {
  service: Pick<Service, 'name' | 'logoUri'>
} & Action

type Area = {
  _id: number,
  title: string,
  description: string,
  action: ServiceAction | undefined
  reaction: ServiceAction | undefined
}

export type { ActionConfig, Action, Service, AuthService, ServiceAction }
export default Area