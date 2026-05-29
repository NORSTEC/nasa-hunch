export type SanityImageAsset = {
  _id: string
  url: string
  metadata?: {
    dimensions?: {
      width: number
      height: number
    }
    lqip?: string
  }
}

export type ImageWithAlt = {
  _key?: string
  alt: string
  asset: SanityImageAsset | null
  crop?: unknown
  hotspot?: unknown
}
