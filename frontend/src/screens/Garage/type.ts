import { ICar, Meta } from "../../types";

export interface CarFormState {
  model: string
  year: string
  make: string

}
export interface ConfigType {
  isEdit: boolean
  id?: string
  car?: ICar
}

export interface useGarageHookType {
  cars: ICar[]
  meta: Meta
  onPress: (car: ICar) => void
  onCreate: () => void
}
