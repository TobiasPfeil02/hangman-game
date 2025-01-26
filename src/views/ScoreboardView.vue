<template>
  <div class="bg-gray-100 min-h-screen flex flex-col items-center">
    <!-- NavBar -->
    <NavBar class="w-full shadow-md bg-white" />

    <!-- Content -->
    <div class="mt-8 p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Scoreboard</h1>

      <!-- Dynamic Scoreboard -->
      <div v-if="topScores.length" class="space-y-4">
        <ScoreCard
          v-for="(attempt, index) in topScores"
          :key="index"
          :position="index + 1"
          :word="attempt.word"
          :meaning="attempt.meaning"
          :timeTaken="`${attempt.timeTaken}s`"
          class="w-full"
        />
      </div>

      <p v-else class="text-center text-gray-500">No attempts yet. Play a game to add scores!</p>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import ScoreCard from '@/components/ScoreCard.vue';
import { useGameStore } from '@/stores/game';

export default {
  name: 'ScoreboardView',
  components: {
    NavBar,
    ScoreCard,
  },
  computed: {
    topScores() {
      const gameStore = useGameStore();
      return gameStore.topScores;
    },
  },
};
</script>

<style scoped>
</style>
