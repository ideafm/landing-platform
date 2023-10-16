<template>
  <div>
    <input type="text" v-model="search" placeholder="find component" class="w-full mb-4 border border-gray-400 px-4 py-3 text-base">
    <div class="space-y-4" ref="list">
      <div v-for="component in filteredRegistry" :key="component.path" class="flex cursor-pointer" @click="selectComponent(component)">
        <div class="img-container flex-shrink-0 mr-4">
          <img class="w-full" :src="component.img ? component.img : 'http://placehold.it/300x200?text=no+photo'" :alt="component.name">
        </div>
        <div class="flex-1">
          <div class="text-lg">{{ component.name }}</div>
          <div class="text-base">{{ component.description }}</div>
        </div>
      </div>
    </div>
    <modal v-if="selectedComponent" @close="selectedComponent = null">
      <config-component :component="selectedComponent" :parentId="parentId" @save="save" />
    </modal> 
  </div>
</template>

<script>
import registry from '../helpers/registry';

export default {
  props: ['parentId'],
  data() {
    return {
      registry,
      search: '',
      selectedComponent: null,
    }
  },
  computed: {
    filteredRegistry() {
      return this.registry.filter(comp => comp.name.toLowerCase().indexOf(this.search) !== -1 || comp.description.toLowerCase().indexOf(this.search) !== -1);
    }
  },
  mounted() {
    this.$refs.list.style.height = 66 * this.registry.length + (16 * (this.registry.length - 1)) + 'px';
  },
  methods: {
    selectComponent(component) {
      this.selectedComponent = component;
    },
    save() {
      this.selectedComponent = null;
      this.$emit('close');
    }
  }
}
</script>
 
<style scoped>
.img-container {
  width: 100px;
}
</style>