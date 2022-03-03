import axiosAPI from "./config"
import { Platform } from "react-native"
import { Service } from "../types"
import { AppAuthError, AuthConfiguration, authorize } from "react-native-app-auth"

const getServices = async (mode: "" | "offline") => axiosAPI({
  method: "GET",
  url: `/service/${mode}`,
  params: {
    platform: Platform.OS
  }
})

const authorizeService = async (service: Service) => {
  const config: AuthConfiguration = {
    clientId: service.link.clientID,
    redirectUrl: service.link.redirectUri,
    scopes: service.link.scope.split(' '),
    serviceConfiguration: {
      authorizationEndpoint: service.link.authorizationEndpoint,
      tokenEndpoint: ""
    },
    usePKCE: false,
    skipCodeExchange: true
  };
  try {
    return await authorize(config)
  } catch (err) {
    const error = err as AppAuthError
    return null
  }
}

const linkService = async (serviceName: string, authorizationCode: string) => {
  serviceName = serviceName.toLowerCase()

  return axiosAPI({
    method: "GET",
    url: "/link",
    params: {
      service: serviceName,
      code: authorizationCode,
      redirect_uri: `area:/${serviceName}`
    }
  })
}

const unlinkService = async (serviceName: string) => axiosAPI({
  method: "DELETE",
  params: {
    service: serviceName.toLowerCase()
  }
})

export { getServices, authorizeService, linkService, unlinkService }