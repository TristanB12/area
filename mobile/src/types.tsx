type Action = {
  title: string,
  requiresUserAuth: boolean,
  config?: object
}

type Service = {
  name: string,
  logoUri: string,
  isAuth: boolean,
  actions: Action[],
  reactions: Action[]
}

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

export type { Service, Action, ServiceAction }
export default Area