<script setup lang="ts">
defineProps({
  nickname: {
    type: String,
    required: true,
  },
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
})
</script>

<template>
  <div
    class="score-card flex flex-col lg:flex-row items-center gap-1 lg:gap-4 p-4 border border-gray-300 rounded-lg shadow-md mx-auto"
  >
    <span>#{{ position }}</span>
    <div
      v-for="(value, label) in {
        Score: score,
        Nickname: nickname,
        Difficulty: difficulty,
        'Time Taken': timeTaken,
        Word: word,
        Meaning: meaning,
      }"
      :key="label"
    >
      <span class="font-bold text-sm mr-1">{{ label }}:</span>
      <span>{{ value }}</span>
    </div>
  </div>
</template>
