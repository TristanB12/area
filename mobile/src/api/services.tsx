import axiosAPI from "./config"
import { Platform } from "react-native"
import { ServiceLink } from "../types"
import { AppAuthError, AuthConfiguration, authorize, prefetchConfiguration } from "react-native-app-auth"

const getServices = async (mode: "" | "offline") => axiosAPI({
  method: "GET",
  url: `/service/${mode}`,
  params: {
    platform: Platform.OS
  }
})

const serviceLinkToAuthConfiguration = (serviceLink: ServiceLink): AuthConfiguration => ({
  clientId: serviceLink.clientID,
  redirectUrl: serviceLink.redirectUri,
  scopes: serviceLink.scope.split(' '),
  additionalHeaders: {
    'Accept': 'application/json'
  },
  serviceConfiguration: {
    authorizationEndpoint: serviceLink.authorizationEndpoint,
    tokenEndpoint: ""
  },
  usePKCE: false,
  skipCodeExchange: true
})

const prefetchAuthorizeService = async (serviceLink: ServiceLink) => (
  await prefetchConfiguration(serviceLinkToAuthConfiguration(serviceLink))
)

const authorizeService = async (serviceLink: ServiceLink) => {
  try {
    return await authorize(serviceLinkToAuthConfiguration(serviceLink))
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

export { getServices, prefetchAuthorizeService, authorizeService, linkService, unlinkService }