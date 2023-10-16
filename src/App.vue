<template>
  <div id="app" :class="cls">
    <div class="fixed bottom-4 right-4 space-x-4">
      <font-awesome-icon :icon="sync" class="text-5xl text-green-600 cursor-pointer" @click="clearLocalStorage" />
      <font-awesome-icon :icon="cog" class="text-5xl text-green-600 cursor-pointer" @click="showGlobalConfigModal" />
    </div>
    <template v-if="$state.nodes.length === 0">
      <div class="flex items-center text-blue-500 cursor-pointer" @click="showRegistryModal">
        <font-awesome-icon :icon="plus" class="text-5xl" />
        <span class="ml-4 text-2xl">Add first registry component</span>
      </div>
    </template>
    <template v-else>
      <generator :nodes="$state.nodes" />

      <div class="flex items-center justify-center text-blue-500 cursor-pointer" @click="showRegistryModal">
        <font-awesome-icon :icon="plus" class="text-lg" />
        <span class="ml-4 text-base">Add</span>
      </div>
    </template>
    
    <modal v-if="registryModalVisible" @close="registryModalVisible = false"> 
      <registry-modal @close="registryModalVisible = false" />
    </modal>

    <modal v-if="globalConfigModal" @close="globalConfigModal = false"> 
      <global-config @close="globalConfigModal = false" @save="saveGlobalConfig" />
    </modal>
  </div>
</template>

<script>
import { faCubes, faCog, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'App',
  data() {
    return {
      registryModalVisible: false,
      globalConfigModal: false,
    }
  },
  head() {
    console.log('head setting');
    let head = {
      title: {
        inner: this.$state.config.title || 'default title',
        separator: ' ',
        complement: ' ', 
      }
    }
    let meta = [];
    if(this.$state.config.keywords) {
      meta.push({name: 'keywords', content: this.$state.config.keywords})
    }
    if(this.$state.config.description) {
      meta.push({name: 'description', content: this.$state.config.description})
    }
    head.meta = meta;
    return head;
  },
  computed: {
    plus() {
      return faCubes;
    },
    cog() {
      return faCog;
    },
    sync() {
      return faSyncAlt;
    },
    cls() {
      if(this.$state.nodes.length === 0) {
        return 'w-full h-full flex items-center justify-center';
      } 
      return ''
    }
  },
  mounted() {
    this.setStyles();
  },
  methods: {
    saveGlobalConfig() {
      this.setStyles();
      this.$emit('updateHead');
    },
    setStyles() {
      this.$state.config.backgroundColor && document.body.style.setProperty("--bgColor", this.$state.config.backgroundColor);
      this.$state.config.textColor && document.body.style.setProperty("--textColor", this.$state.config.textColor);
      this.$state.config.fontSize && document.body.style.setProperty("--fontSize", this.$state.config.fontSize + 'px');
      this.$state.config.containerWidth && document.body.style.setProperty("--containerWidth", this.$state.config.containerWidth + 'px');
    },
    showRegistryModal() {
      this.registryModalVisible = true;
    },
    showGlobalConfigModal() {
      this.globalConfigModal = true;
    },
    clearLocalStorage() {
      window.sessionStorage.clear();
      window.location.reload();
    }
  }
}
</script>

<style>
  html, body {
    height: 100%;
  }
</style>