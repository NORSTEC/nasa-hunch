import type {ImageWithAlt} from '../objects/image'
import type {PortableText} from '../objects/portableText'
import type {SocialLinks} from '../objects/socialLinks'

export type HeroSection = {
  logo: ImageWithAlt
  images: ImageWithAlt[]
  contactBlock: {
    email: string
    socials: SocialLinks
  }
  description: PortableText
}
