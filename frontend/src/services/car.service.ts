import { ICar } from "../types"
import { url } from "./api"

export const getCars = async () => {
  return await fetch(url, { method: "GET" }).then(r => r.json())
}

export const createCar = async (data: any) => {
  return await fetch(url, {
    body: JSON.stringify(data),
    method: "POST"
  }).then(r => r.json())
}


export const updateCar = async (id: string, data: any) => {
  return await fetch(`${url}/${id}`, {
    body: JSON.stringify(data),
    method: "PUT"
  }).then(r => r.json())
}

export const removeCar = async (id: string) => {
  return await fetch(`${url}/${id}`, {
    method: "DELETE"
  }).then(r => r.json())
}