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