import SecureAxios from "./SecureAxios"

export const GET = async (url) => {
    const response  = await SecureAxios({
      method: "GET",
      url,
    })
      return response
  }