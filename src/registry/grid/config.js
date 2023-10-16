export default{
  name: 'grid',
  description: 'grid component',
  img: 'http://placehold.it/300x200',
  config: {
    columns: {
      name: 'Num of columns',
      type: 'input',
      placeholder: 'enter a number of columns',
      unit: '',
      inputType: 'text',
      defaultValue: 2,
      required: true,
    }
  }
}
