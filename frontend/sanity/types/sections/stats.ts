import type {ImageWithAlt} from '../objects/image'

export type StatItem = {
  _key: string
  number: number
  text: string
}

export type StatsSection = {
  logo: ImageWithAlt
  stats: StatItem[]
}
