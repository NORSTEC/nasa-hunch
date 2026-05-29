import {defineField, defineType} from 'sanity'

export const statItem = defineType({
  name: 'statItem',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      number: 'number',
      text: 'text',
    },
    prepare({number, text}) {
      return {
        title: `${number ?? ''} ${text ?? ''}`.trim(),
      }
    },
  },
})
