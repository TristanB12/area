import { AxiosError } from "axios";
import { loginEmail, loginService, signupEmail, signupService } from "./auth";
import { linkService, unlinkService } from './services'
import { createArea, getAreas, editArea, deleteArea } from './areas'
import { setAccessToken, verify, refresh } from './tokens'
import { useRecoilValue } from "recoil";
import authAtom from "../recoil/atoms/auth";

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
    link: withErrorHandling(linkService),
    unlink: withErrorHandling(unlinkService)
  },
  tokens: {
    setAccessToken: setAccessToken,
    verify: withErrorHandling(verify),
    refresh: withErrorHandling(refresh)
  }
}

export default api