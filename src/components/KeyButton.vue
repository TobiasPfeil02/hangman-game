<script setup lang="ts">
const props = defineProps<{
  state: 'default' | 'success' | 'error'
}>()
</script>
<template>
  <button :class="`btn-${props.state}`">
    <slot />
  </button>
</template>

<style scoped>
.btn-default {
  background-color: white;
  color: black;
}
.btn-success {
  background-color: #55cf3e;
  color: white;
}

.btn-error {
  background-color: #cf3e3e;
  color: white;
}
</style>
