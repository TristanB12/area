import { AxiosError } from "axios";
import axiosAPI from "./config";
import { loginEmail, loginService, signupEmail, signupService } from "./auth";
import { linkService } from './services'

type ErrorResponse = {
  status: number,
  message: string
}
type APIResponse<T> = {
  data: T | null,
  error: ErrorResponse | null
}
type Awaited<T> = T extends PromiseLike<infer U> ? U : T

// function withErrorHandling<T extends Array<any>, U>
// (fn: (...args: T) => U): (...args: T) => U | Promise<ErrorResponse> {
//   return async function(...args: T): U | Promise<ErrorResponse> {
//     try {
//       return await fn(...args);
//     } catch (error) {
//       const err = error as AxiosError
//       return {
//         status: err.response?.status || 404,
//         message: err.response?.data || "Unknown error"
//       }
//     }
//   };
// }

function withErrorHandling<T extends Array<any>, U>
(fn: (...args: T) => U): (...args: T) => Promise<APIResponse<Awaited<U>>> {
  return async function(...args: T): Promise<APIResponse<Awaited<U>>> {
    try {
      const data = await fn(...args)
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

function setAccessToken(access_token: string) {
  axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
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
  services: {
    link: withErrorHandling(linkService)
  },
  setAccessToken: setAccessToken
}

export default api