import { Request, Response, Router, NextFunction } from 'express'
import { createLinkAsset } from '../helper';
import { removeCarById, getCarById, getCarPhoto, getCars, updateCarById } from '../service/car.service';
import { ICar } from '../type';
import BaseController from './base.cotroller'

export default class CarController extends BaseController {
  constructor(router: Router) {
    super();
    BaseController.addRouter(router, this);
  }
  url = '/api/car/'

  /**
   * 
   * @param req [Request]
   * @param res [Response]
   * @returns [ICar[]]
   * 
   */
  async index(req: Request, res: Response) {
    const cars: ICar[] = await getCars()

    // added photos to car
    const carWithPhotos = await Promise.all(cars.map(async (car) => {
      let photo;
      try {
        photo = await getCarPhoto(car.id);
      } catch (e) {
        console.log(e.message)
      }
      return { ...car, image: createLinkAsset(req, photo) }
    }));

    return res.json({
      data: carWithPhotos
    })
  }

  /**
   * 
   * @param req [Request]
   * @param res [Response]
   * @returns [ICar[]]
   * 
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
    } catch (e) {
      console.log(e.message)
      return res.status(400).send({ message: e.message })
    }

    return res.json({
      data: req.body
    })
  }
  /**
   * 
   * @param req [Request]
   * @param res [Response]
   * @returns [ICar[]]
   * 
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      /// validation
      const id = req.params.id
      const { year, model, make_id } = req.body
      if ([year, model, make_id].filter(Boolean).length !== 3) {
        throw new Error('All fields are required')
      }
      await updateCarById(model, make_id, year, id)
      const responseData = await getCarById(id)
      return res.json({ data: responseData })
    } catch (e) {
      return res.status(400).send({ message: e.message })
    }
  }
  /**
   * 
   * @param req [Request]
   * @param res [Response]
   * @returns null
   * 
   */
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await removeCarById(req.params.id)

    } catch (e) {
      console.log(e.message)
      return res.status(400).send({ message: e.message })
    }

    return res.status(400).send('sample delte error')
    // return res.json({
    //   data: req.body
    // })
  }
}

