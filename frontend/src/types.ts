export interface IImage {
  url: string
}

export interface ICar {
  id: string
  model: string
  make: string
  year: string
  image: IImage
}

export type RootStackParamList = {
  Garage: undefined
  Details: {
    params: ICar
  },
  Form: {
    type: string
  }
};


export interface ActionType<T> {
  type: string
  id: string
  payload?: T | string | boolean
}

export interface Meta {
  loading: boolean
  error: string
}