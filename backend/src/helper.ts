import { Request } from 'express';
import { IPhoto, IImageWithThumbs } from './type';
/// i created this promise helper because i cant find doc for async sqlite3 
export const promisafy = <T>(fn: Function, arg: any) =>
  (...params: any): Promise<T> => new Promise(
    (resolve, reject) => fn(arg, params, (err: Error, data: any) => err ? reject(err) : resolve(data)))


export const createLinkAsset = (req: Request, photo?: IPhoto): IImageWithThumbs => {
  const host = req.get('host')
  const name = photo?.name
  return {
    url: `${host}/assets/${name}`,
    xs: `${host}/assets/thumb/xs/${name}`,
    sm: `${host}/assets/thumb/sm/${name}`,
    md: `${host}/assets/thumb/sm/${name}`
  }
}