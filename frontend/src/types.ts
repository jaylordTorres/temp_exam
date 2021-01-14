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
  }
};


export interface ActionType<T> {
  type: string
  payload: T | string
}
