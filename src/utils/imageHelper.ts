export enum ImageResolution {
  MICRO = '120x90',
  THUMBNAIL = '160x120',
  SMALL = '240x180',
  MEDIUM = '580x435',
  LARGE = '800x600',
  XL = '1920x1080',
}

export function getListingItemImageUrl(
  photoUrl: string,
  resolution: ImageResolution = ImageResolution.SMALL,
): string {
  if (!photoUrl) {
    return ''
  }

  return photoUrl.replace('{0}', resolution)
}
