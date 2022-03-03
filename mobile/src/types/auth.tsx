type AuthTokens = {
  access_token: string,
  refresh_token: string,
  expires_in: number,
  token_type: "Bearer"
}

type AuthState = {
  isLoading: boolean,
  isSignout: boolean,
  isFirstTimeUsingApp: boolean,
  email: string,
} & Pick<AuthTokens, 'access_token' | 'refresh_token'>

type AuthStorage = {
  access_token: string,
  refresh_token: string,
  expire_timestamp: number,
  token_type: "Bearer",
  email: string
}

export type { AuthTokens, AuthState, AuthStorage }