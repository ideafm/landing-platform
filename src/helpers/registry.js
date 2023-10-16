const components = require.context('../registry', true, /(config.js|\w+\.vue)$/);
const registry = {};
components.keys().forEach(filename => {
  const dir = filename.slice(2).split('/')[0];
  const name = filename.split('/').pop().replace(/\.\w+$/, '');
  const ext = filename.split('/').pop().replace(/^[\w-]+\./, '');
  const resultObject = registry[dir] || {};
  
  resultObject.folder = dir;
  
  if(ext === 'vue') {
    resultObject.filename = `${name}.vue`;
    resultObject.path = `@/registry/${dir}/${name}.vue`;
  }
  
  if(name === 'config') {
    const config = components(filename);
    Object.assign(resultObject, config.default);
  }

  registry[dir] = resultObject
})

export default Object.values(registry);