
export const genId = require('uuid').v4;
/// get all prefilled assets
/// will use to randomaise json items photos
export function getAssets(): string[] {
  const assets: string[] = [];
  const files = './assets/';
  const fs = require('fs');
  fs.readdirSync(files).forEach((file: string) => {
    if (file.match(/\.jpg/i)) {
      assets.push(file)
    }
  });

  return assets
}


export const assets = getAssets();

export function randoImage() {
  return getRanodmImageFilename(assets)

}
export function getRanodmImageFilename(images: string[]): string {
  return images[Math.floor(Math.random() * images.length)]
}