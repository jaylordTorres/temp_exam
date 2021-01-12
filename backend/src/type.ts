export interface IImage {
  url: string
}
export interface IImageWithThumbs {
  url: string
  xs: string
  sm: string
  md: string
}
export interface ICar {
  id: string
  model: string
  make: string
  year: string
  image: IImage
}

export interface IMaker {
  id: string
  name: string
}

export interface IPhoto {
  id: string
  car_id: string
  name: string
}

export interface ICarJson {
  id: string
  make: string
  model: string
  year: number
}