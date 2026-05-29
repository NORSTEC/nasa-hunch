import {imageWithAltFields} from './fragments'

export const carouselSectionFields = `
  images[] {
    ${imageWithAltFields}
  }
`

export const carouselSectionQuery = `
  *[_type == "carouselSection"][0] {
    ${carouselSectionFields}
  }
`
