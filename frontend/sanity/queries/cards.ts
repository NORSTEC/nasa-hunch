import {imageWithAltFields} from './fragments'

export const cardsSectionFields = `
  title,
  cards[] {
    _key,
    image {
      ${imageWithAltFields}
    },
    description
  }
`

export const cardsSectionQuery = `
  *[_type == "cardsSection"][0] {
    ${cardsSectionFields}
  }
`
