const dirTree = require('directory-tree');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const tree = dirTree('./src/registry', {attributes: ["type", "extension"], exclude: /__mock/}); 
const registry = [];

tree.children.forEach(dir => {
  const componentHash = crypto.createHash('sha256');
  let component = dir.children.find(item => item.extension === '.vue');
  let componentBuffer = fs.readFileSync(component.path);
  componentHash.update(componentBuffer);

  const description = dir.children.find(f => f.name === 'description.json');
  try {
    const descriptionString = fs.readFileSync(description.path, 'utf-8');
    const descriptionJSON = JSON.parse(descriptionString);
    Object.assign(component, descriptionJSON);
  } catch (error) {
    throw new Error('Description.json is not valid');
  }

  component.id = componentHash.digest('hex');
  component.root = dir.path;
  component.absoluteRoot = path.resolve(__dirname, dir.path)

  registry.push(component)
})

fs.writeFileSync('./src/registry.json', JSON.stringify(registry))