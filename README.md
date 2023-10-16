# landing-platform

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Component config types
config format
```
[{
  name: string > "config item name",
  type: string > "buttons | input
    [input type]
      unit: string,
      inputType: string (equal to input type),
      placeholder: string,
      value: string,
    [buttons type]
      values: array<{key: string, value: string}>
}]  
```
### Customize configuration
nodes format
```
{
  tagName: 'div',
  children: [
    {
      tagName: 'h1',
      textNode: 'Great News'
    },
    {
      tagName: 'h3',
      textNode: 'YOU CAN CREATE VUE COMPONENTS OUT OF JSON'
    },         
    {
      tagName: 'a',
      properties: {
        attrs: {href: '#'}
      },
      textNode: 'Vue.js'
    },
    {
        tagName: 'span',
        textNode: 'check classse',
        properties: {
          class: 'test-class',
        },
    },
    {
      tagName: 'test-component',
      properties: {
        props: {
          foo: 'FOO PROP FROM JSON !'
        }
      }
    }
  ]
}
```
