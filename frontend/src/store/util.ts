import { ICar } from '../types'

export function mergeKeys(old: string[], data: ICar[]) {
  data.forEach(car => {
    if (!old.includes(car.id)) {
      old.push(car.id)
    }
  })
  return [...old]
}

export function mergeValues(old: Record<string, ICar>, data: ICar[], overide: boolean = false) {
  const res = old || {}
  data.forEach((car) => {
    if (!res[car.id] || overide) {
      res[car.id] = car
    }
  })
  return { ...res }
}