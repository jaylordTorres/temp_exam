
export function mergeKeys<T extends { id: string }>(old: string[], data: T[]) {
  data.forEach(car => {
    if (!old.includes(car.id)) {
      old.push(car.id)
    }
  })
  return [...old]
}

export function mergeValues<T extends { id: string }>(old: Record<string, T>, data: T[], overide: boolean = false) {
  const res = old || {}
  data.forEach((i) => {
    if (!res[i.id] || overide) {
      res[i.id] = i
    }
  })
  return { ...res }
}