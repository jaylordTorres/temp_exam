import { Router } from 'express'
import CarController from './controller/car.controller'
import MakerController from './controller/maker.controller';

const router = Router()

new CarController(router);
new MakerController(router)

export default router
