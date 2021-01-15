import { url } from "./api"
import { validateResponseError } from "./util"

const baseUrl = url + '/car/'

export const getCars = async () => {
  return await fetch(baseUrl, { method: "GET" }).then(r => r.json())
}

export const createCar = async (data: any) => {
  return await fetch(baseUrl, {
    body: JSON.stringify(data),
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
  }).then(validateResponseError).then(r => r.json())
}


export const updateCar = async (id: string, data: any) => {
  return await fetch(`${baseUrl}${id}`, {
    body: JSON.stringify(data),
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
  }).then(validateResponseError).then(r => r.json())
}

export const removeCar = async (id: string) => {
  return await fetch(`${baseUrl}${id}`, {
    method: "DELETE"
  }).then(validateResponseError).then(r => r.json())
}
