<template>
  <div>
    <div class="text-3xl text-blue-500 mb-6">{{ component.name }} configuration</div>

    <div class="space-y-4">
      <config-option v-for="(desc, option) in component.config" :key="option" :option="option" v-model="configResult" :desc="desc" @change="changed" />
    </div>

    <div class="flex justify-center mt-8">
      <button @click="save" class="bg-transparent rounded border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none ease-linear transition-all duration-150">
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
import { storeActions } from '../store'

export default {
  props: ['component','currentNode','mode', 'parentId'],
  data() {
    return {
      configResult: {},
    }
  },
  created() {
    if(this.mode === 'edit') {
      this.configResult = { ...this.currentNode.properties.props.config };
    } else {
      Object.keys(this.component.config).forEach(optionName => {
        let val = this.component.config[optionName].defaultValue || null;
        this.configResult[optionName] = val;
      })
    }
  },
  methods: {
    changed(e) {
      console.log(e);
    },
    save() {
      if(this.mode === 'edit') {
        storeActions.updateNodeConfigById(this.currentNode._id, this.configResult);
      } else {
        let node = this.createNewNode();
        storeActions.addNode(node, this.parentId || null);
      }
      this.$emit('save');
    },
    createNewNode() {
      let node = {
        _id: nanoid(),
        tag: this.$state.prefix + this.component.name,
        properties: {
          props: {
            config: this.configResult
          }
        }
      };
      
      if(this.component.name === 'grid') {
        let children = [];
        for(let i = 0; i < this.configResult.columns; i++ ) {
          children.push({
            _id: nanoid(),
            tag: this.$state.prefix + 'placeholder',
            placeholder: true,
            properties: {
              class: 'grid-inner'
            }
          })
        }
        node.children = children;
      }
      return node;
    }
  }
}
</script>