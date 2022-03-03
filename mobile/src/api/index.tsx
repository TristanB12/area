import { AxiosError, AxiosResponse } from "axios";
import { loginEmail, loginService, signupEmail, signupService } from "./auth";
import { getServices, authorizeService, linkService, unlinkService } from './services'
import { createArea, getAreas, editArea, deleteArea } from './areas'
import { setAccessToken, refreshAccessToken, verifyAccessToken } from './tokens'
import { retrieveUserSessionFromStorage } from "../storage";
import { getTodaysTimestampInSeconds } from "../utils";

type APIError = {
  status: number,
  message: string
}
type APIResponse<T> = {
  data: T | null,
  error: APIError | null
}

function withErrorHandling<T extends Array<any>, U>(
  fn: (...args: T) => Promise<AxiosResponse<U, any>>
): (...args: T) => Promise<APIResponse<U>> {
  return async function(...args: T): Promise<APIResponse<U>> {
    const storage = await retrieveUserSessionFromStorage()

    if (storage && storage.expire_timestamp < getTodaysTimestampInSeconds()) {
      await refreshAccessToken(storage.access_token)
    }
    try {
      const { data } = await fn(...args)
      return {
        data: data,
        error: null
      }
    } catch (error) {
      const err = error as AxiosError
      return {
        data: null,
        error: {
          status: err.response?.status || 404,
          message: err.response?.data?.message || "Unknown error"
        }
      }
    }
  };
}

const api = {
  auth: {
    login: {
      email: withErrorHandling(loginEmail),
      service: withErrorHandling(loginService)
    },
    signup: {
      email: withErrorHandling(signupEmail),
      service: withErrorHandling(signupService),
    }
  },
  areas: {
    create: withErrorHandling(createArea),
    get: withErrorHandling(getAreas),
    edit: withErrorHandling(editArea),
    delete: withErrorHandling(deleteArea)
  },
  services: {
    get: withErrorHandling(getServices),
    authorize: authorizeService,
    link: withErrorHandling(linkService),
    unlink: withErrorHandling(unlinkService)
  },
  tokens: {
    setAccessToken: setAccessToken,
    refresh: refreshAccessToken,
    verify: withErrorHandling(verifyAccessToken),
  }
}

export type { APIError, APIResponse }
export default api