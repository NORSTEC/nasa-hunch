import {defineField, defineType} from 'sanity'

export const carouselSection = defineType({
  name: 'carouselSection',
  title: 'Carousel',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'imageWithAlt'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Carousel',
      }
    },
  },
})
