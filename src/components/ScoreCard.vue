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
  score: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="score-card flex items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-md  mx-auto">
    <div class="flex items-center">
      <span class="font-bold mr-1">#</span> <span>{{ position }}</span>
    </div>
    <div class="flex items-center">
      <span class="font-bold mr-1">Word:</span> <span>{{ word }}</span>
    </div>
    <div class="flex items-center">
      <span class="font-bold mr-1">Meaning:</span> <span>{{ meaning }}</span>
    </div>
    <div class="flex items-center">
      <span class="font-bold mr-1">Time Taken:</span> <span>{{ timeTaken }}</span>
    </div>
    <div class="flex items-center">
      <span class="font-bold mr-1">Difficulty:</span> <span>{{ difficulty }}</span>
    </div>
    <div class="flex items-center">
      <span class="font-bold mr-1">Score:</span> <span>{{ score }}</span>
    </div>
  </div>
</template>

<style scoped>
</style>
