type AuthTokens = {
  access_token: string,
  refresh_token: string,
  expires_in: number,
  token_type: "Bearer"
}

type AuthState = {
  isLoading: boolean,
  isSignout: boolean,
  email: string,
} & Pick<AuthTokens, 'access_token' | 'refresh_token'>

type AuthStorage = AuthTokens & Pick<AuthState, 'email'>

export type { AuthTokens, AuthState, AuthStorage }