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
  <div class="score-card flex flex-col gap-1 p-4 border border-gray-200 rounded-lg mx-auto">
    <span>#{{ position }}</span>
    <p
      v-for="(value, label) in {
        Score: score,
        Nickname: nickname,
        Difficulty: difficulty,
        'Time taken': timeTaken,
        Word: word,
        Meaning: meaning,
      }"
      :key="label"
    >
      <span class="font-medium text-sm mr-1 text-gray-500">{{ label }}:</span> {{ value }}
    </p>
  </div>
</template>
