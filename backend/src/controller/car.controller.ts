import { Request, Response, Router, NextFunction } from 'express'
import { createLinkAsset } from '../helper';
import { createCar, removeCarById, getCarById, getCarPhoto, getCars, updateCarById } from '../service/car.service';
import { ICar } from '../type';
import BaseController from './base.cotroller'
import { genId, randoImage } from '../service/util'
import { createPhoto } from '../service/photo.service';
import { optimize } from '../service/upload';

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
   * @returns [ICar]
   * 
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      CarController.validateCar(req.body)
      const { year, model, make_id } = req.body
      const carId = genId();
      const photoId = genId();
      const tempImage = randoImage()
      await createCar(carId, make_id, model, year)
      await createPhoto(photoId, carId, tempImage)
      await optimize(carId, 'assets/' + tempImage, 'jpg')
      const data = await getCarById(carId)
      return res.json({ data })
    } catch (e) {
      return res.status(400).send({ message: e.message })
    }

  }
  /**
   * 
   * @param req [Request]
   * @param res [Response]
   * @returns [ICar]
   * 
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      CarController.validateCar(req.body)
      const id = req.params.id
      const { year, model, make_id } = req.body
      await updateCarById(model, make_id, year, id)
      const data = await getCarById(id)
      return res.json({ data })
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
      return res.send({ data: 'delete' })
    } catch (e) {
      console.log(e.message)
      return res.status(400).send({ message: e.message })
    }
  }

  static validateCar({ year, model, make_id }: { year: number, make_id: string, model: string }) {
    if ([year, model, make_id].filter(Boolean).length !== 3) {
      throw new Error('All fields are required')
    }
  }
}

