import { photoVersions } from "../constant";

const Jimp = require('jimp');

const outpath = 'assets'


type IOptimize = Record<string, string>;

// generate thumbnails image
export async function optimize(id: String, path: String, ext: String = 'jpg'): Promise<IOptimize> {
  const image = await Jimp.read(path)
  const result: IOptimize = {}

  await Promise.all(
    Object.keys(photoVersions).map(async (key) => {
      const [width, quality] = photoVersions[key]
      const opath = `${outpath}/thumb/${key}/${id}.${ext}`
      try {
        if (width) await image.resize(width, Jimp.AUTO)
        if (quality) await image.quality(quality)
        await image.writeAsync(opath)
        result[key] = opath
      } catch (e) {
        console.log(e.message)
        return null
      }
    })
  )
  return result
}

// test
if (require.main === module) {
  const testing = async () => {
    const result = await optimize('2b301b3e-00a0-11ea-a1df-d319b5694f62', 'assets/vehicle_image-2b301b3e-00a0-11ea-a1df-d319b5694f62.jpg')
    console.log(result)
  }
  testing()
} 