import { Platform } from "react-native"
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
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

const authFacebook = async (action: 'login' | 'signup', service: Service) => {
  const res = await LoginManager.logInWithPermissions(service.link.scope.split(' '))
  if (res.isCancelled) {
    throw new Error()
  }
  const authTokens = await AccessToken.getCurrentAccessToken()

  return axiosAPI.request<AuthTokens>({
    method: "POST",
    url: `/auth/${action}`,
    params: {
      service: service.name,
      access_token: authTokens?.accessToken
    }
  })
}

const authService = async (action: 'login' | 'signup', service: Service) => {
  if (service.name.toLowerCase() === "facebook") {
    return await authFacebook(action, service)
  }
  const authorizeResult = await authorizeService(service.link)

  if (authorizeResult === null) {
    throw new Error()
  }

  return axiosAPI.request<AuthTokens>({
    method: "POST",
    url: `/auth/${action}`,
    params: {
      service: service.name,
      code: authorizeResult.authorizationCode,
      platform: Platform.OS
    }
  })
}

const loginService = async (service: Service) => authService('login', service)
const signupService = async (service: Service) => authService('signup', service)

export type { AuthForm, AuthTokens }
export { loginEmail, loginService, signupEmail, signupService }