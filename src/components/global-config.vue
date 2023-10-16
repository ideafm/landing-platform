<template>
  <div>
    <div class="text-3xl mb-8">Base config</div>
    <div class="space-y-4 text-base">
      <div v-for="(type, prop) in props" :key="prop" class="flex items-center justify-between">
        {{ prop }}: <input :type="type" v-model="config[prop]" class="border border-blue-500 w-96 px-2">
      </div>
    </div>
    <div class="mt-8">
      <button @click="save" class="bg-transparent rounded border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none ease-linear transition-all duration-150">
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
import { storeActions } from '../store';

export default {
  data() {
    return {
      props: {
        title: 'text',
        keywords: 'text',
        description: 'text',
        containerWidth: 'number',
        backgroundColor: 'color',
        textColor: 'color',
        fontSize: 'number',
      },
      config: {}
    }
  }, 
  mounted() {
    this.config = { ...this.$state.config }
  },
  methods: {
    save() {
      storeActions.updateProp('config', {...this.config})
      this.$emit('save');
      this.$emit('close');
    }
  }
}
</script>