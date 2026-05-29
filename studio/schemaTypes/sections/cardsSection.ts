import {defineField, defineType} from 'sanity'

export const cardsSection = defineType({
  name: 'cardsSection',
  title: 'Cards',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{type: 'cardItem'}],
      validation: (rule) => rule.required().min(3),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Cards',
      }
    },
  },
})
