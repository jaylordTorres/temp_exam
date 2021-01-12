import { optimize as optimizePhoto } from './upload';
const sqlite3 = require('sqlite3').verbose();
const genId = require('uuid').v4;
const data = require('../cars.json')

export const db = new sqlite3.Database(':memory:');

interface ICarJson {
  id: string
  make: string
  model: string
  year: number
}

interface IMaker {
  id: string
  name: string
}

///
/// migration
/// must run only one time
///

export function migration() {

  db.run("CREATE TABLE make (id STRING UNIQUE, name TEXT)");
  db.run("CREATE TABLE photo (id STRING UNIQUE, car_id STRING, name STRING)");
  db.run("CREATE TABLE car (id STRING UNIQUE, make_id STRING, model STRING, year INT)");
  /// process makers
  const makers = getAllMaker(data.items)
  const makersIds = toIds(makers)
  const makerSmt = db.prepare("INSERT INTO make VALUES (?, ?)");
  makers.forEach(i => makerSmt.run(i.id, i.name))
  makerSmt.finalize();

  /// process cars
  const cars: ICarJson[] = data.items
  const carSmt = db.prepare("INSERT INTO car VALUES (?, ?, ?, ?)");
  const addedCarIds: string[] = [];
  cars.forEach(i => {
    if (!i.id || addedCarIds.includes(i.id)) {
      /// means this record has already been added to db
      // console.log('invalid id', i.id)
      return
    }
    carSmt.run(i.id, makersIds[i.make], i.model, i.year)
    addedCarIds.push(i.id)
  })
  carSmt.finalize();

  /// process images
  const assets = getAssets();
  const assetSmt = db.prepare("INSERT INTO photo VALUES (?, ?, ?)");
  addedCarIds.forEach((carId => {
    const name = `vehicle_image-${carId}.jpg`
    if (assets.includes(name)) {
      assetSmt.run(genId(), carId, name)
      console.log('has photo', name)
      /// this will create thumbnails images on assets
      optimizePhoto(carId, 'assets/' + name, 'jpg')
    }
  })
  )

  db.each("SELECT id, name FROM make", function (err: Error, row: any) {
    err ? console.log(err) : null

  });
  db.each("SELECT id, make_id, year, model FROM car", function (err: Error, row: any) {
    err ? console.log(err) : null
  });
  db.each("SELECT id, car_id, name model FROM photo", function (err: Error, row: any) {
    err ? console.log(err) : null
  });
  console.log('db migrated and add contents')
}

function getAllMaker(record: ICarJson[] = []): IMaker[] {
  const makers: IMaker[] = []
  const uniqueMaker = new Set<string>(record.map(i => i.make))
  uniqueMaker.forEach((name) => {
    makers.push({
      id: genId(),
      name
    })
  })
  return makers
}

function toIds(item: IMaker[] = []): Record<string, string> {
  return item.reduce((c, p) => ({ ...c, [p.name]: p.id }), {})
}

function getAssets(): string[] {
  const assets: string[] = [];
  const files = './assets/';
  const fs = require('fs');
  fs.readdirSync(files).forEach((file: string) => {
    assets.push(file)
  });

  return assets
}

export function iniitalize() {
  db.serialize(migration)
}

// test
if (require.main === module) {
  const testing = async () => {
    db.serialize(migration)
  }
  testing()
} 