<script setup lang="ts">
import {Button} from "@/components/ui/button"
const props = defineProps<{
  state: 'default' | 'success' | 'error'
}>()
</script>
<template>
  <Button :class="`btn-${props.state}`">
    <slot />
  </Button>
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
