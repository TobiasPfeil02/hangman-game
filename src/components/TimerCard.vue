<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  initialTime: {
    type: Number,
    default: 60,
  },
})

const time = ref(props.initialTime)
</script>

})
<template>
  <div class="timer">
    <p>{{ time }}</p>
  </div>
</template>

<style scoped></style>
