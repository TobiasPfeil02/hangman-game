<script setup lang="ts">
defineProps({
  position: {
    type: Number,
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  meaning: {
    type: String,
    required: true,
  },
  timeTaken: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class="score-card flex flex-col lg:flex-row items-center gap-1 lg:gap-4 p-4 border border-gray-300 rounded-lg shadow-md mx-auto"
  >
    <div
      v-for="(value, label) in {
        '#': position,
        'Word': word,
        'Meaning': meaning,
        'Time Taken': timeTaken,
        'Difficulty': difficulty,
      }"
      :key="label"
    >
      <span class="font-bold mr-1">{{ label }}:</span>
      <span>{{ value }}</span>
    </div>
  </div>
</template>
