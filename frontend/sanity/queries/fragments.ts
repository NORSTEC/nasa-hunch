export const imageWithAltFields = `
  _key,
  alt,
  "asset": image.asset->{
    _id,
    url,
    metadata {
      dimensions {
        width,
        height
      },
      lqip
    }
  },
  "crop": image.crop,
  "hotspot": image.hotspot
`
