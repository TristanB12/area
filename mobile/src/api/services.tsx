import axiosAPI from "./config"

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

export { linkService, unlinkService }