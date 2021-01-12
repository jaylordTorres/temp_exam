import { Request, Response, Router } from 'express'
import { createLinkAsset } from '../helper';
import { getCarPhoto, getCars } from '../service/car.service';
import { ICar } from '../type';

class BaseController {
  url = ''
  static addRouter(router: Router, controller: BaseController) {
    router.get(controller.url, controller.index)
  }
  index(_req: Request, res: Response) { }
}


export default class CarController extends BaseController {
  constructor(router: Router) {
    super();
    BaseController.addRouter(router, this);
  }
  url = '/'

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
      return {
        ...car, image: createLinkAsset(req, photo)
      }
    }));

    return res.json(carWithPhotos)
  }
}

