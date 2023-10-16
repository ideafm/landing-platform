<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-black bg-opacity-30 inset-0 fixed z-30" @click="$emit('close')"></div>
    <div class="bg-white w-1/2 h-auto overflow-auto rounded-lg shadow-lg p-10 relative z-40 modal-content">
      <div class="absolute right-5 top-5 cursor-pointer" @click="$emit('close')">&times;</div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.modal-content {
  max-height: 80vh;
}
</style>