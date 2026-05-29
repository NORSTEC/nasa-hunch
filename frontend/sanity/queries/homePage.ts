import {cardsSectionFields} from './cards'
import {carouselSectionFields} from './carousel'
import {heroSectionFields} from './hero'
import {statsSectionFields} from './stats'

export const homePageQuery = `
  {
    "hero": *[_type == "heroSection"][0] {
      ${heroSectionFields}
    },
    "stats": *[_type == "statsSection"][0] {
      ${statsSectionFields}
    },
    "cards": *[_type == "cardsSection"][0] {
      ${cardsSectionFields}
    },
    "carousel": *[_type == "carouselSection"][0] {
      ${carouselSectionFields}
    }
  }
`
