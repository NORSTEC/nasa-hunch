import {defineField, defineType} from 'sanity'

export const statsSection = defineType({
  name: 'statsSection',
  title: 'Stats',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{type: 'statItem'}],
      validation: (rule) => rule.required().min(2),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Stats',
      }
    },
  },
})
