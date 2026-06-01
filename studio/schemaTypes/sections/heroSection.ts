import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo light mode',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'darkLogo',
      title: 'Logo dark mode',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'imageWithAlt'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'contactBlock',
      title: 'Contact and socials',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Contact email',
          type: 'email',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'socials',
          title: 'Socials',
          type: 'socialLinks',
          validation: (rule) => rule.required(),
        }),
      ],
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
    prepare() {
      return {
        title: 'Hero',
      }
    },
  },
})
