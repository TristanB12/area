import axiosAPI from './config'
import { AuthTokens } from '../types/auth'

type AuthForm = {
  email: string,
  password: string,
  confirmPassword: string
}

async function authEmail(action: 'login' | 'register', authForm: AuthForm): Promise<AuthTokens> {
  const { data } = await axiosAPI.post<AuthTokens>(
    (action === "login") ? "/auth/login?service=area" : "/auth/signup/area",
    authForm
  )
  return data
}

async function loginEmail(authForm: AuthForm): Promise<AuthTokens> {
  return authEmail('login', authForm)
}

async function signupEmail(authForm: AuthForm): Promise<AuthTokens> {
  return authEmail('register', authForm)
}

async function loginService(service: 'google' | 'facebook'): Promise<AuthTokens> {
  const params = new URLSearchParams({
    var1: "value",
    var2: "value2",
    arr: "foo",
  });
  console.log(params.toString());
}

async function signupService(service: 'google' | 'facebook'): Promise<AuthTokens> {
  const params = new URLSearchParams({
    var1: "value",
    var2: "value2",
    arr: "foo",
  });
  console.log(params.toString());
}

export type { AuthForm, AuthTokens }
export { loginEmail, loginService, signupEmail, signupService }