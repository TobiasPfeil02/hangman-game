<script setup lang="ts">
import { computed, type ComputedRef, ref } from 'vue'
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
import ScoreTable from '@/components/ScoreTable.vue'

const selectedDifficulty = ref('all') // Default filter is 'all'
const selectedNickname = ref('All')
const gameStore = useGameStore()

const topScores = computed(() => gameStore.topScores)

const filteredScores: ComputedRef<
  {
    score: number
    nickname: string
    difficulty: string
    timeTaken: number
    word: string
    meaning: string
  }[]
> = computed(() =>
  topScores.value.filter(
    ({ difficulty, nickname }) =>
      (selectedDifficulty.value === 'all' ||
        difficulty.toLowerCase() === selectedDifficulty.value.toLowerCase()) &&
      (selectedNickname.value === 'All' ||
        (nickname && nickname.toLowerCase() === selectedNickname.value.toLowerCase())),
  ),
)

const availableNicknames = computed(() =>
  Array.from(new Set(topScores.value.map(({ nickname }) => nickname).filter(Boolean))),
)

const filterScoresByDifficulty = (difficulty: string) => (selectedDifficulty.value = difficulty)
</script>

<template>
  <div class="min-h-screen flex flex-col items-center h-[100dvh]">
    <NavBar class="w-full" />

    <div class="mt-2 px-6 py-3 bg-white shadow-lg rounded-lg w-full">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Scoreboard</h1>

      <div v-if="topScores && topScores.length > 0">
        <!-- interaction for difficulty and nickname -->
        <div class="flex flex-col sm:flex-row justify-start gap-4 mb-6 w-full">
          <div class="flex justify-between gap-4">
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

          <Select v-model="selectedNickname">
            <SelectTrigger :disabled="!availableNicknames.length" class="sm:max-w-[300px]">
              <SelectValue>{{ selectedNickname }}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectLabel>Nickname</SelectLabel>
              <SelectItem
                v-for="nickname in ['All', ...availableNicknames]"
                :key="nickname"
                :value="nickname"
              >
                {{ nickname }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- score data -->
        <div v-if="filteredScores?.length" class="h-[100%] overflow-y-auto">
          <!-- display for desktop -->
          <div class="hidden md:block">
            <ScoreTable :filtered-scores="filteredScores" />
          </div>

          <!-- display for mobile -->
          <div class="w-full md:hidden space-y-4">
            <ScoreCard
              v-for="(attempt, index) in filteredScores"
              :key="index"
              :nickname="attempt.nickname"
              :position="index + 1"
              :word="attempt.word"
              :meaning="attempt.meaning"
              :timeTaken="`${attempt.timeTaken}s`"
              :difficulty="attempt.difficulty"
              :score="attempt.score"
            />
          </div>
        </div>

        <!-- no score data for filter -->
        <p v-else class="text-center text-gray-500">No attempts yet. Play a game to add scores!</p>
      </div>

      <!-- no scores available -->
      <div
        v-else
        class="mt-2 px-6 py-3 w-full h-[80dvh] flex flex-col items-center justify-center gap-4"
      >
        <h2 class="text-xl text-center">You haven't played a game yet!</h2>
        <Button>
          <router-link to="/start" class="btn btn-secondary">Play game</router-link>
        </Button>
      </div>
    </div>
  </div>
</template>
