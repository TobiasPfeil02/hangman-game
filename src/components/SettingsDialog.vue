<script setup lang="ts">
import { useGameStore } from '@/stores/game.ts'
import { Difficulty } from '@/types/difficulty.enum.ts'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const game = useGameStore()
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button>Settings</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="mb-2 font-bold">Settings</DialogTitle>
        <h4>Select Difficulty:</h4>
        <div>
          <Button
            v-for="difficulty in Object.values(Difficulty)"
            :key="difficulty"
            variant="outline"
            class="mr-2 font-semibold hover:border-green-700"
            :class="{
              'text-white hover:text-white  border-green-700 bg-green-700 hover:bg-green-700': game.difficulty == difficulty,
            }"
            @click="game.setDifficulty(difficulty)"
          >
            {{ difficulty.charAt(0).toUpperCase() + difficulty.slice(1) }}
          </Button>
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
