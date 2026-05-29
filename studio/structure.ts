import {BarChartIcon, ImagesIcon, RocketIcon, ThLargeIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sections')
    .items([
      S.listItem()
        .title('Hero')
        .icon(RocketIcon)
        .child(S.document().schemaType('heroSection').documentId('heroSection')),
      S.listItem()
        .title('Stats')
        .icon(BarChartIcon)
        .child(S.document().schemaType('statsSection').documentId('statsSection')),
      S.listItem()
        .title('Cards')
        .icon(ThLargeIcon)
        .child(S.document().schemaType('cardsSection').documentId('cardsSection')),
      S.listItem()
        .title('Carousel')
        .icon(ImagesIcon)
        .child(S.document().schemaType('carouselSection').documentId('carouselSection')),
    ])
