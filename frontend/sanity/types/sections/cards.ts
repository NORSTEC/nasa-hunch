import type {ImageWithAlt} from '../objects/image'
import type {PortableText} from '../objects/portableText'

export type CardItem = {
  _key: string
  image: ImageWithAlt
  description: PortableText
}

export type CardsSection = {
  title: string
  cards: CardItem[]
}
