import { db } from './db'
import { ICar, IMaker, IPhoto } from '../type'
import { promisafy } from '../helper'



export const getCars = promisafy<ICar[]>(db.all.bind(db),
  `SELECT car.id as id, make.name as make, model, year FROM car LEFT JOIN make ON make.id = car.make_id`)

export const getCarById = promisafy<ICar>(db.get.bind(db),
  `SELECT car.id as id, make.name as make, model, year FROM car LEFT JOIN make ON make.id = car.make_id`)

export const getCarPhoto = promisafy<IPhoto>(db.get.bind(db),
  `SELECT id, name FROM photo WHERE car_id= ?`)