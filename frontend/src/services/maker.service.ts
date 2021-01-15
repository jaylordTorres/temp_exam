import { url } from "./api"
import { validateResponseError } from "./util"

const baseUrl = url + '/maker'

export const getMakers = async () => {
  return await fetch(baseUrl, { method: "GET" }).then(validateResponseError).then(r => r.json())
}
