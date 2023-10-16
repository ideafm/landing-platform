/* eslint-disable no-debugger */
import Vue from 'vue';

const findNodeById = (id, nodes = state.nodes, path = []) => {
  let res = false;
  for(let i = 0; i < nodes.length; i++) {
    let el = nodes[i];
    if(el._id === id) {
      path.push(i)
      res = {
        node: el,
        path,
      }
      return res;
    }
    if(el.children) {
      let p = [...path]
      p.push(i);
      res = findNodeById(id, el.children, p)
    } 
    if(res) {
      return res;
    }
  }
  return res;
}

const getNodesArrayByPath = (path) => {
  let nodes = [...state.nodes];
  let pathCopy = [...path];
  let nested = null;
  if(pathCopy.length === 1) {
    nested = nodes;
  } else {
    pathCopy.pop();
    for(let i = 0; i < pathCopy.length; i++) {
      nested = nested === null ? nodes[pathCopy[i]].children : nested[pathCopy[i]].children;
    }
  } 
  return { nodes, nested };
}

let nodes = [];
let str = window.sessionStorage.getItem('nodes');
let ids = [];
if(str) {
  try {
    nodes = JSON.parse(str) || [];
    ids = [...str.matchAll(/_id":"(\w+)"/g)].map(i => i[1])
  } catch (error) {
    console.log('JSON.parse nodes error');
  }
}

let config = {};
let strConfig = window.sessionStorage.getItem('config');
if(strConfig) {
  try {
    config = JSON.parse(strConfig) || [];
  } catch (error) {
    console.log('JSON.parse config error');
  }
}



export const state = Vue.observable({
  mode: 'dev',
  prefix: 'reg-',
  nodes,
  ids,
  config,
});

export const storeActions = {
  getInfoById(id) {
    let { path } = findNodeById(id);
    let res = getNodesArrayByPath(path);
    let { nodes, nested } = res;
    let index = [...path].pop();
    return {
      nodes,
      nested,
      index,
      node: nested[index],
      path,
    }
  },
  updateProp(prop, value) {
    if(!state[prop]) return false;
    state[prop] = value;
    return true;
  },
  addNode(node, parentId = null) {
    if(parentId === null) {
      state.nodes.push(node);
    } else {
      let { node: parentNode, nodes } = this.getInfoById(parentId);
      if(parentNode.placeholder) {
        console.log('parent nodfe', parentNode);
        parentNode = Object.assign(parentNode, node);
        parentNode.placeholderNode = true;
        delete parentNode.placeholder;

        console.log('parent nodfe 1', parentNode);
        console.log(';nodes', nodes);
      } else {
        if(parentNode.children) {
          parentNode.children.push(node);
        } else {
          parentNode.children = [node];
        }
      }
      state.nodes = nodes
    }
  },
  updateNodeConfigById(id, config) {
    let { node, nodes } = this.getInfoById(id);
    node.properties.props.config = config;
    state.nodes = nodes;
  },
  moveUp(id) {
    let { nodes, nested, index } = this.getInfoById(id);
    if(index === 0) { 
      return false; 
    }
    [nested[index - 1], nested[index]] = [nested[index], nested[index-1]]
    state.nodes = nodes;
  },
  moveDown(id) {
    let { nodes, nested, index } = this.getInfoById(id);
    if(index === nested.length - 1) {
      return false
    }
    [nested[index], nested[index + 1]] = [nested[index + 1], nested[index]]
    state.nodes = nodes;
  },
  remove(id) {
    let { nodes, nested, index } = this.getInfoById(id);
    nested.splice(index,1);
    state.nodes = nodes;
  }
}

window.storeActions = storeActions;

new Vue({
  created() {
    this.$watch(() => state.nodes, (nodes) => {
      window.sessionStorage.setItem('nodes', JSON.stringify(nodes));
      console.log("nodes changed to:", nodes)
      // should save in session storage
    })
    this.$watch(() => state.config, (config) => {
      window.sessionStorage.setItem('config', JSON.stringify(config));
      console.log("config changed to:", config)
      // should save in session storage
    })
  },
})



// nodes: [
  //   {
  //     "_id": "HQxYqgNIZAZnZ226aAGDF",
  //     "tag": "reg-title",
  //     "properties": {
  //       "props": {
  //         "config": {
  //           "title": "123",
  //           "fontSize": "text-lg"
  //         }
  //       }
  //     },
  //     "children": [{
  //       "_id": "HQxYqgNIZAZnZ226aAGDF1",
  //       "tag": "div",
  //       "text": "Fooooo222222222"
  //     }]
  //   },
  //   {
  //     "_id": "gt1JziaiVOetj4RWtcpe2",
  //     "tag": "reg-title",
  //     "properties": {
  //       "props": {
  //         "config": {
  //           "title": "234234",
  //           "fontSize": "text-3xl"
  //         }
  //       }
  //     }
  //   },
  //   {
  //     "_id": "htxl2s1JuAsltgnuln-Dw",
  //     "tag": "reg-title",
  //     "properties": {
  //       "props": {
  //         "config": {
  //           "title": "1111",
  //           "fontSize": "text-3xl"
  //         }
  //       }
  //     },
  //     "children": [{
  //       "_id": "htxl2s1JuAsltgnuln-Dw1",
  //       "tag": "div",
  //       "text": "Fooooo",
  //     },{
  //       "_id": "htxl2s1JuAsltgnuln-Dw11",
  //       "tag": "div",
  //       "text": "Fooooo1",
  //     }]
  //   }
  // ]


  // [{"_id":"0lktPWxAX1OxfuHtGiZPf","tag":"reg-title","properties":{"props":{"config":{"title":"123123","fontSize":"text-3xl"}}}},{"_id":"AxHKXSEmXLPJz1d3F6W8x","tag":"reg-grid","properties":{"props":{"config":{"columns":2}}}}]