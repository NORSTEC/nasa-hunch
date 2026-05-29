import {imageWithAltFields} from './fragments'

export const heroSectionFields = `
  logo {
    ${imageWithAltFields}
  },
  images[] {
    ${imageWithAltFields}
  },
  contactBlock {
    email,
    socials {
      linkedin,
      instagram,
      facebook
    }
  },
  description
`

export const heroSectionQuery = `
  *[_type == "heroSection"][0] {
    ${heroSectionFields}
  }
`
