
export interface CarFormState {
  model: string
  year: string
  make: string

}
export interface ConfigType {
  isEdit: boolean
}

export interface useCarFormHookType {
  config: ConfigType
  state: CarFormState
  onChangeMake: (value: string) => void
  onChangeYear: (value: string) => void
  onChangeModel: (value: string) => void
}
