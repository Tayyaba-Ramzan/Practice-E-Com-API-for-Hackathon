import { type SchemaTypeDefinition } from 'sanity'
import productSchema from './product'
import categorySchema from './catetory'
import tagsSchema from './tags'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema,categorySchema,tagsSchema],
}
