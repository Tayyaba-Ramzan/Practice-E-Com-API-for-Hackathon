const tagsSchema = {
    name: 'tags',
    type: 'document',
    title: 'Tags',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Tag Name', 
      }
    ],
  };
  
  export default tagsSchema;
  