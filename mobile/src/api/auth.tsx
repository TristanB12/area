import axiosAPI from './config'
import { AuthTokens } from '../types/auth'
import { Service } from '../types'
import { authorizeService } from './services'

type AuthForm = {
  email: string,
  password: string,
  confirmPassword: string
}

const authEmail = async (action: 'login' | 'signup', authForm: AuthForm) => axiosAPI.request<AuthTokens>({
  method: "POST",
  url: `/auth/${action}/area`,
  data: authForm
})

const loginEmail = async (authForm: AuthForm) => authEmail('login', authForm)
const signupEmail = async (authForm: AuthForm) => authEmail('signup', authForm)

const authService = async (action: 'login' | 'signup', service: Service) => {
  const appID = "641786881554-de3lqqggorlek49cum271bqqetr507sk"
  const authorizationCode = await authorizeService(service)

  if (authorizationCode === null) {
    throw new Error()
  }

  // return axiosAPI.request<AuthTokens>({
  //   method: "POST",
  //   url: `/auth/${action}`,
  //   params: {
  //     service: service.name,
  //     code: authorizationCode,
  //     redirect_uri: `com.googleusercontent.apps.${appID}:/google`
  //   }
  // })
}

const loginService = async (service: Service) => authService('login', service)
const signupService = async (service: Service) => authService('signup', service)

export type { AuthForm, AuthTokens }
export { loginEmail, loginService, signupEmail, signupService }