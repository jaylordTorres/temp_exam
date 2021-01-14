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

export interface useCarFormHookType {
  config: ConfigType
  state: CarFormState
  meta: Meta
  onChangeMake: (value: string) => void
  onChangeYear: (value: string) => void
  onChangeModel: (value: string) => void
  onSubmit: () => void
  onDelete: () => void
}
