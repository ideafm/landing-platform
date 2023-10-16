<template>
  <div>
    <div class="text-3xl">Select component</div>
    <div class="space-y-2 mt-8 text-xl">
      <div v-for="(component, index) in components" :key="component._id" :style="{paddingLeft: index * 10 + 'px'}" class="flex items-center justify-between">
        <div>{{ component.tag }} 
          <!-- <span class="text-sm">({{component.properties.props.config.title}})</span> -->
        </div>
        <font-awesome-icon :icon="check" @click.prevent.stop="$emit('select', component._id)" class="icon cursor-pointer text-blue-500" />
      </div>
    </div>
  </div>
</template>

<script>
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default {
  props: ['path'],
  computed: {
    check() {
      return faCheck;
    }
  },
  data() {
    return {
      components: []
    }
  },
  created() {
    let nodes = [...this.$state.nodes];
    this.path.forEach(i => {
      this.components.push(nodes[i]);
      nodes = nodes[i].children;
    })
  }
}
</script>