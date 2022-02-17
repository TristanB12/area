import axiosAPI from "./config"

async function linkService(serviceName: string, authorizationCode: string) {
  serviceName = serviceName.toLowerCase()

  const params = new URLSearchParams({
    service: serviceName,
    code: authorizationCode,
    redirect_uri: `area:/${serviceName}`,
  });
  const url = `link?${params.toString()}`
  console.log(url)
  const { data } = await axiosAPI.get(url)
  return data
}

export { linkService }