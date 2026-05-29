import {imageWithAltFields} from './fragments'

export const statsSectionFields = `
  logo {
    ${imageWithAltFields}
  },
  stats[] {
    _key,
    number,
    text
  }
`

export const statsSectionQuery = `
  *[_type == "statsSection"][0] {
    ${statsSectionFields}
  }
`
