

<script setup lang="ts">
import { ref, computed } from 'vue';
import NavBar from '@/components/NavBar.vue';
import ScoreCard from '@/components/ScoreCard.vue';
import { useGameStore } from '@/stores/game';

const selectedDifficulty = ref('all'); // Default filter is 'all'
const gameStore = useGameStore();

const topScores = computed(() => gameStore.topScores);

const filteredScores = computed(() => {
  if (selectedDifficulty.value === 'all') {
    return topScores.value;
  }
  return topScores.value.filter(
    (score: { difficulty: string }) => score.difficulty.toLowerCase() === selectedDifficulty.value
  );
});

function filterScores(difficulty: string) {
  selectedDifficulty.value = difficulty;
}
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex flex-col items-center">
    <!-- NavBar -->
    <NavBar class="w-full shadow-md bg-white" />

    <!-- Content -->
    <div class="mt-8 p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Scoreboard</h1>

      <!-- Filter Buttons -->
      <div class="flex justify-center space-x-4 mb-6">
        <button
          class="px-4 py-2 rounded-lg font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none"
          :class="{ 'bg-gray-400': selectedDifficulty === 'all' }"
          @click="filterScores('all')"
        >
          All
        </button>
        <button
          class="px-4 py-2 rounded-lg font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none"
          :class="{ 'bg-gray-400': selectedDifficulty === 'easy' }"
          @click="filterScores('easy')"
        >
          Easy
        </button>
        <button
          class="px-4 py-2 rounded-lg font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none"
          :class="{ 'bg-gray-400': selectedDifficulty === 'medium' }"
          @click="filterScores('medium')"
        >
          Medium
        </button>
        <button
          class="px-4 py-2 rounded-lg font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none"
          :class="{ 'bg-gray-400': selectedDifficulty === 'hard' }"
          @click="filterScores('hard')"
        >
          Hard
        </button>
      </div>

      <!-- Scoreboard -->
      <div v-if="filteredScores?.length" class="space-y-4">
        <ScoreCard
          v-for="(attempt, index) in filteredScores"
          :key="index"
          :position="index + 1"
          :word="attempt.word"
          :meaning="attempt.meaning"
          :timeTaken="`${attempt.timeTaken}s`"
          :difficulty="attempt.difficulty.toUpperCase()"
          class="w-full"
        />
      </div>

      <p v-else class="text-center text-gray-500">No attempts yet. Play a game to add scores!</p>
    </div>
  </div>
</template>

<style scoped>
</style>
