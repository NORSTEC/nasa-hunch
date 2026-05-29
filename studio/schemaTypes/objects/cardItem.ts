import {defineField, defineType} from 'sanity'

export const cardItem = defineType({
  name: 'cardItem',
  title: 'Card',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableTextBlock',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'image.alt',
      media: 'image.image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Card',
        media,
      }
    },
  },
})
