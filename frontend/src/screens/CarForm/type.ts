import { ICar, IMaker, Meta } from "../../types";

export interface CarFormState {
  model: string
  year: string
  make_id: string

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
  makers: IMaker[]
  onChangeMake: (value: string) => void
  onChangeYear: (value: string) => void
  onChangeModel: (value: string) => void
  onSubmit: () => void
  onDelete: () => void
}
