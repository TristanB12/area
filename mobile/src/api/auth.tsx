import axiosAPI from './config'

type AuthForm = {
  email: string,
  password: string,
  confirmPassword: string
}

type AuthResponse = {
  access_token: string,
  refresh_token: string,
  expires_in: number,
  token_type: "Bearer"
}

async function authEmail(action: 'login' | 'register', authForm: AuthForm): Promise<AuthResponse> {
  const { data } = await axiosAPI.post<AuthResponse>(
    (action === "login") ? "/auth/login?service=area" : "/auth/signup/area",
    authForm
  )
  return data
}

async function loginEmail(authForm: AuthForm): Promise<AuthResponse> {
  return authEmail('login', authForm)
}

async function signupEmail(authForm: AuthForm): Promise<AuthResponse> {
  return authEmail('register', authForm)
}

async function loginService(service: 'google' | 'facebook'): Promise<AuthResponse> {
  const params = new URLSearchParams({
    var1: "value",
    var2: "value2",
    arr: "foo",
  });
  console.log(params.toString());
}

async function signupService(service: 'google' | 'facebook'): Promise<AuthResponse> {
  const params = new URLSearchParams({
    var1: "value",
    var2: "value2",
    arr: "foo",
  });
  console.log(params.toString());
}

export type { AuthForm }
export { loginEmail, loginService, signupEmail, signupService }