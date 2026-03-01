import {defineArrayMember, defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt text'}),
        defineField({name: 'caption', type: 'string', title: 'Caption'}),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({scheme: ['http', 'https', 'mailto']}),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', type: 'string', title: 'Alt text'}),
            defineField({name: 'caption', type: 'string', title: 'Caption'}),
          ],
        }),
        defineArrayMember({
          name: 'codeBlock',
          type: 'object',
          title: 'Code block',
          fields: [
            defineField({
              name: 'language',
              type: 'string',
              title: 'Language',
              options: {
                list: [
                  {title: 'JavaScript', value: 'javascript'},
                  {title: 'TypeScript', value: 'typescript'},
                  {title: 'HTML', value: 'html'},
                  {title: 'CSS', value: 'css'},
                  {title: 'JSON', value: 'json'},
                  {title: 'Shell', value: 'shell'},
                  {title: 'Plain', value: 'text'},
                ],
              },
            }),
            defineField({
              name: 'code',
              type: 'text',
              title: 'Code',
              rows: 10,
            }),
          ],
          preview: {
            select: {language: 'language'},
            prepare: ({language}) => ({
              title: 'Code',
              subtitle: language,
            }),
          },
        }),
        defineArrayMember({
          name: 'blockQuote',
          type: 'object',
          title: 'Block quote',
          fields: [
            defineField({
              name: 'quote',
              type: 'text',
              title: 'Quote',
              rows: 3,
            }),
            defineField({
              name: 'attribution',
              type: 'string',
              title: 'Attribution',
            }),
          ],
          preview: {
            select: {quote: 'quote'},
            prepare: ({quote}) => ({
              title: 'Quote',
              subtitle: quote?.slice(0, 50) + (quote?.length > 50 ? '…' : ''),
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {title: 'title', media: 'mainImage'},
    prepare: ({title, media}) => ({
      title: title ?? 'Untitled',
      media,
    }),
  },
})
