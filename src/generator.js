import Vue from 'vue';
import _ from 'lodash';
import DevWrapper from './components/devWrapper.vue';

const createComponent = (dNode, h, mode) => {
  if (_.isEmpty(dNode)) {
    return [];
  }
  if (_.isArray(dNode)) {
    return dNode.map((child) => createComponent(child, h, mode))
  }
  let children = []; 
  
  if (dNode.children && dNode.children.length > 0) {
    dNode.children.forEach((c) => {
      if (_.isString(c)) {
        children.push(c)
      } else {
        children.push(createComponent(c, h, mode))
      }
    });
  }
  // Need to clone 
  const properties = _.cloneDeep(dNode.properties)
  if(mode === 'dev') {
    return h(DevWrapper, {props: {id: dNode._id}}, [h(dNode.tag, properties, children.length > 0? children : dNode.text)])
  }
  return h(dNode.tag, properties, children.length > 0? children : dNode.text);
}

Vue.component('generator', {
  render: function (h) {

    return createComponent({
      _id: 'root',
      tag: 'div',
      children: this.nodes
    }, h, this.$state.mode)
  },
  props: {
    nodes: {
      type: [Object, Array],
      required: true
    }
  }
});