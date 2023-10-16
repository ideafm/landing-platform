<template>
  <div :class="config.fontSize">
    {{ config.title }}
    <slot />
  </div>
</template>

<script>
export default {
  props: ['config'],
}
</script>
