export interface IImage {
  url: string
}

export interface ICar {
  id: string
  model: string
  make: string
  make_id: string
  year: string
  image: IImage
}

export interface IMaker {
  id: string
  name: string
}

export interface ICarEditType extends Partial<ICar> { }


export type RootStackParamList = {
  Garage: undefined
  Details: {
    params: ICar
  },
  Form: {
    type: string
    id?: string
    car?: ICar
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
  cache: boolean
}