import axiosAPI from './config'
import { AuthTokens } from '../types/auth'

type AuthForm = {
  email: string,
  password: string,
  confirmPassword: string
}

const authEmail = async (action: 'login' | 'register', authForm: AuthForm) => axiosAPI.request<AuthTokens>({
  method: "POST",
  url: (action === "login") ? "/auth/login?service=area" : "/auth/signup/area",
  data: authForm
})

const loginEmail = async (authForm: AuthForm) => authEmail('login', authForm)
const signupEmail = async (authForm: AuthForm) => authEmail('register', authForm)

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