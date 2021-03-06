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
  usePKCE: true,
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

const linkService = async (serviceName: string, authorizationCode: string, codeVerifier: string) => {
  serviceName = serviceName.toLowerCase()

  return axiosAPI({
    method: "POST",
    url: "/link",
    params: {
      platform: Platform.OS,
      service: serviceName,
      code: authorizationCode,
      code_verifier: codeVerifier,
    }
  })
}

const unlinkService = async (serviceName: string) => axiosAPI({
  method: "DELETE",
  url: "/link",
  params: {
    service: serviceName.toLowerCase()
  }
})

export { getServices, prefetchAuthorizeService, authorizeService, linkService, unlinkService }