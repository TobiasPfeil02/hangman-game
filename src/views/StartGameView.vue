<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Difficulty } from '@/types/difficulty.enum.ts'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/stores/game.ts'

const game = useGameStore()
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full gap-2">
    <h1 class="text-center font-bold text-4xl mb-2">Configure Game</h1>
    <h2>Choose a nickname:</h2>
    <Input class="w-1/3" placeholder="HangmanProfi123" v-model="game.nickname" />
    <h2>Select difficulty</h2>
    <div>
      <Button
        v-for="difficulty in Object.values(Difficulty)"
        :key="difficulty"
        variant="outline"
        class="mr-2 font-semibold hover:border-green-700"
        :class="{
          'text-white hover:text-white  border-green-700 bg-green-700 hover:bg-green-700':
            game.difficulty == difficulty,
        }"
        @click="game.setDifficulty(difficulty)"
      >
        {{ difficulty.charAt(0).toUpperCase() + difficulty.slice(1) }}
      </Button>
    </div>
    <router-link to="/game" class="mt-12">
      <Button>Start Game</Button>
    </router-link>
  </div>
</template>

<style scoped></style>
