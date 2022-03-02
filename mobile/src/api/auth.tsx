import axiosAPI from './config'
import { AuthTokens } from '../types/auth'
import { AuthConfiguration, authorize, AppAuthError } from 'react-native-app-auth'
import { Service } from '../types'

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

const authorizeService = async (service: Service) => {
  const appID = "641786881554-de3lqqggorlek49cum271bqqetr507sk"
  const config: AuthConfiguration = {
    clientId: `${appID}.apps.googleusercontent.com`,
    redirectUrl: `com.googleusercontent.apps.${appID}:/google`,
    scopes: ['email', 'profile'],
    serviceConfiguration: {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token"
    },
    usePKCE: false,
    skipCodeExchange: true
  };
  try {
    return await authorize(config)
  } catch (err) {
    const error = err as AppAuthError
    return null
  }
}

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