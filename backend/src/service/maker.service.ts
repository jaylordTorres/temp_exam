import { db } from './db'
import { IMaker } from '../type'
import { promisafy } from '../helper'


export const getMakers = promisafy<IMaker[]>(db.all.bind(db),
  `SELECT id, name FROM make`)