<template>
  <div>
    <template v-if="desc.type === 'input'">
      <div class="flex flex-row">
        <div class="w-2/5 flex items-center text-base">{{ desc.name }}<span v-if="desc.required" class="text-red-500 ml-1">*</span></div>
        <div class="w-3/5 flex items-baseline">
          <input 
            :type="desc.inputType? desc.inputType : 'text'"
            :placeholder="desc.placeholder"
            :required="desc.required"
            :value="data[option] || ''"
            class="border border-blue-500 p-2 rounded w-full text-sm"
            @input="setValue($event.target.value)"
          >
          <span v-if="desc.unit">{{ desc.unit }}</span>
        </div>
      </div>
    </template>
    <template v-if="desc.type === 'buttons'">
      <div class="flex flex-row">
        <div class="w-2/5 flex items-center text-base">{{ desc.name }}</div>
        <div class="w-3/5">
          <div class="flex items-center space-x-2">
            <button
              v-for="v in desc.values" 
              :key="v.key"
              class="bg-transparent rounded border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none ease-linear transition-all duration-150"
              :class="{'bg-blue-500 text-white': v.key === data[option], 'bg-white text-blue-500': v.key !== data[option]}"
              @click="setValue(v.key)"
              type="button">
              {{ v.label }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'data', 
    event: 'change',
  },
  props: ['option', 'desc', 'data'],
  methods: {
    setValue(value) {
      this.$emit('change', {...this.data, [this.option]: value});
    }
  }
}
</script>