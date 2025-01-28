<script setup lang="ts">
import { ref, computed } from 'vue'
import NavBar from '@/components/NavBar.vue'
import ScoreCard from '@/components/ScoreCard.vue'
import { useGameStore } from '@/stores/game'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const selectedDifficulty = ref('all') // Default filter is 'all'
const selectedNickname = ref('all') // Default filter is 'all'
const gameStore = useGameStore()

const topScores = computed(() => gameStore.topScores)

const filteredScores = computed(() => {
  if (selectedDifficulty.value === 'all') {
    return topScores.value
  }
  return topScores.value.filter(
    (score: { difficulty: string }) => score.difficulty.toLowerCase() === selectedDifficulty.value,
  )
})

const availableNicknames = Array.from(
  new Set(
    gameStore.topScores
      .filter((score) => score.nickname != undefined)
      .map((score) => score.nickname),
  ),
)

function filterScoresByDifficulty(difficulty: string) {
  selectedDifficulty.value = difficulty
}

function filterScoresByNickname(username: string) {
  console.log(availableNicknames)
  console.log(username)
  selectedNickname.value = username
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center h-[100dvh]">
    <!-- NavBar -->
    <NavBar class="w-full" />

    <!-- Content -->
    <div class="mt-2 px-6 py-3 bg-white shadow-lg rounded-lg w-full">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Scoreboard</h1>

      <!-- Filter Buttons -->
      <div class="flex flex-col justify-between gap-4 mb-6 w-full">
        <div class="flex justify-between">
          <Button
            v-for="difficulty in ['all', 'easy', 'medium', 'hard']"
            :key="difficulty"
            class="px-4 py-2 rounded-lg font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none"
            :class="{ 'bg-gray-400': selectedDifficulty === difficulty }"
            @click="filterScoresByDifficulty(difficulty)"
          >
            {{ difficulty.toUpperCase() }}
          </Button>
        </div>
        <Select @change="filterScoresByNickname">
          <SelectTrigger :disabled="availableNicknames.length === 0">
            <SelectValue placeholder="Nickname">{{ selectedNickname }}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectLabel>Nickname</SelectLabel>
            <SelectItem
              v-for="(nickname, index) in availableNicknames"
              :key="index"
              :value="nickname"
              >{{ nickname }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Scoreboard -->
      <div v-if="filteredScores?.length" class="space-y-4 h-[60dvh] overflow-scroll">
        <ScoreCard
          v-for="(attempt, index) in filteredScores"
          :key="index"
          :nickname="attempt.nickname"
          :position="index + 1"
          :word="attempt.word"
          :meaning="attempt.meaning"
          :timeTaken="`${attempt.timeTaken}s`"
          :difficulty="attempt.difficulty.toUpperCase()"
          :score="attempt.score"
          class="w-full"
        />
      </div>

      <p v-else class="text-center text-gray-500">No attempts yet. Play a game to add scores!</p>
    </div>
  </div>
</template>
