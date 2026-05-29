import type {CardsSection} from './cards'
import type {CarouselSection} from './carousel'
import type {HeroSection} from './hero'
import type {StatsSection} from './stats'

export type HomePage = {
  hero: HeroSection
  stats: StatsSection
  cards: CardsSection
  carousel: CarouselSection
}
