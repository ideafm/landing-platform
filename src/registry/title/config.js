export default{
  name: 'title',
  description: 'title component',
  img: 'http://placehold.it/300x200',
  config: {
    title: {
      name: 'Title',
      type: 'input',
      placeholder: 'enter a title',
      unit: '',
      inputType: 'text',
      defaultValue: '',
      required: true,
    },
    fontSize: {
      name: 'Размер шрифта',
      type: 'buttons',
      defaultValue: 'text-sm',
      values: [{
        key: 'text-sm',
        label: '14px'
      }, {
        key: 'text-lg',
        label: '18px'
      }, {
        key: 'text-3xl',
        label: 'BIG!'
      }]
    },
  }
}

