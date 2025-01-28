<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Difficulty } from '@/types/difficulty.enum.ts'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/stores/game.ts'
import NavBar from '@/components/NavBar.vue'

const game = useGameStore()
</script>

<template>
  <NavBar />
  <div class="flex flex-col items-center justify-center gap-2 h-[90dvh] px-3">
    <h1 class="text-center font-bold text-4xl mb-2">Configure Game</h1>
    <h2>Choose a nickname:</h2>
    <Input
      class="w-full sm:w-1/2 md:w-2/6 lg:w-1/3"
      placeholder="HangmanProfi123"
      v-model="game.nickname"
    />
    <h2>Select difficulty:</h2>
    <div class="flex flex-row gap-2">
      <Button
        v-for="difficulty in Object.values(Difficulty)"
        :key="difficulty"
        variant="outline"
        class="font-semibold hover:border-green-700"
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
