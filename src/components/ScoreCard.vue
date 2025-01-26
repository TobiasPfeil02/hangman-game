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
  </div>
</template>

<script>
export default {
  name: 'ScoreCard',
  props: {
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
  },
};
</script>

<style scoped>
</style>
