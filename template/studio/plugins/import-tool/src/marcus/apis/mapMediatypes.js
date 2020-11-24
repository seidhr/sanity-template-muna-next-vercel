import {nanoid} from 'nanoid'

export const mapMediatypes = (types) => {
  let mappedTypes = []

  types.map((type) => {
    switch (type) {
      case 'ubbont:Painting':
        mappedTypes.push({
          _ref: 'cc652425-39e2-4c56-9b0f-c570d4f979bf',
          _type: 'reference',
          _key: nanoid(),
        })
        break
      case 'ubbont:Photograph':
        mappedTypes.push({
          _ref: 'c8791a86-bdaa-407f-bcda-3e84c05d0750',
          _type: 'reference',
          _key: nanoid(),
        })
        break
      case 'bibo:Manuscript':
        mappedTypes.push({
          _ref: '7f0864c0-82e7-4a05-b7e0-b1dc15f3fe6f',
          _type: 'reference',
          _key: nanoid(),
        })
        break
      default:
        break
    }
  })

  return mappedTypes
}
