const categorySchema = {
    name: 'category',
    type: 'document',
    title: 'Categories',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Category Name',  
        }
    ]
};

export default categorySchema;
