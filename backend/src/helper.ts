import { Request } from 'express';
import { IPhoto, IImageWithThumbs } from './type';
/// i created this promise helper because i cant find doc for async sqlite3 
export const promisafy = <T>(fn: Function, arg: any) =>
  (...params: any): Promise<T> => new Promise(
    (resolve, reject) => fn(arg, params, (err: Error, data: any) => err ? reject(err) : resolve(data)))


export const createLinkAsset = (req: Request, photo?: IPhoto): IImageWithThumbs => {
  const host = req.get('host')
  const name = photo?.name || '.'
  const id = photo?.id || ''
  const ext = name.split('.').slice(-1)[0];
  return {
    url: `${host}/assets/${name}`,
    xs: `${host}/thumb/${id}-xs.${ext}`,
    sm: `${host}/thumb/${id}-sm.${ext}`,
    md: `${host}/thumb/${id}-md.${ext}`
  }
}