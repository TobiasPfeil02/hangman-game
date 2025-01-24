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
        <DialogTitle>Settings</DialogTitle>
        <div>
          <Button
            v-for="difficulty in Object.values(Difficulty)"
            :key="difficulty"
            :class="{
              'btn-active': game.difficulty === difficulty,
              'btn-primary': game.difficulty !== difficulty,
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

<style scoped>
.btn-primary {
  background-color: gray;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: darkgray;
}

/* Aktiver Button-Stil */
.btn-active {
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>
