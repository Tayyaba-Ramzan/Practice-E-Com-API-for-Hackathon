const productSchema = {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Product Name',
        },
        {
            name: 'description',
            type: 'string',
            title: 'Description'
        },
        {
            name: 'category',
            title: 'Product Category',
            type: 'reference',
            to: [{ type: 'category' }]
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            description: 'URL-friendly version of the product name',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        {
            name: 'price',
            type: 'number',
            title: 'Product Price',
        },
        {
            name: 'quantity',
            type: 'number',
            title: 'Quantity',
        },
        {
            name: 'discountPercentage',
            type: 'number',
            title: 'Discount Percentage',
        },
        {
            name: 'priceWithoutDiscount',
            type: 'number',
            title: 'Price Without Discount',
            description: 'Original price before discount'
        },
        {
            name: 'rating',
            type: 'number',
            title: 'Rating',
            description: 'Rating of the product'
        },
        {
            name: 'ratingCount',
            type: 'number',
            title: 'Rating Count',
            description: 'Number of ratings'
        },
        {
            name: 'tags',
            type: 'array',
            title: 'Tags',
            of: [{ type: 'reference', to: [{ type: 'tags' }] }],
            description: 'Add tags like "new arrival", "bestseller", etc.',
        },
        {
            name: 'sizes',
            type: 'array',
            title: 'Sizes',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            },
            description: 'Add sizes like S, M, L, XL, XXL'
        },
        {
            name: 'image',
            type: 'image',
            title: 'Product Image',
            options: {
                hotspot: true // Enables cropping and focal point selection
            }
        }
    ]
};

export default productSchema;
