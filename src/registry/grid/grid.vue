<template>
  <div class="grid">
    <slot />
  </div>
</template>

<script>
export default {
  props: ['config'],
}
</script>

<style lang="stylus" scoped>
  .grid
    display: flex
    > *
      flex: 1
</style>