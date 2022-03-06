type AuthTokens = {
  access_token: string,
  refresh_token: string,
  expires_in: number,
  token_type: "Bearer"
}

type AuthStorage = Omit<AuthTokens, 'expires_in'> & {
  expire_timestamp: number
}

type AuthState = {
  isLoading: boolean,
  isSignedIn: boolean,
  isSignout: boolean,
  isFirstTimeUsingApp: boolean,
}

export type { AuthTokens, AuthState, AuthStorage }