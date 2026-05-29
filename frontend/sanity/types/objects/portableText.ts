export type PortableTextSpan = {
  _key: string
  _type: 'span'
  text: string
  marks?: string[]
}

export type PortableTextBlock = {
  _key: string
  _type: 'block'
  style?: string
  listItem?: string
  level?: number
  children?: PortableTextSpan[]
  markDefs?: unknown[]
}

export type PortableText = PortableTextBlock[]
