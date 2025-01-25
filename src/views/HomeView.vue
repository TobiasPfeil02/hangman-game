<script setup lang="ts">
import { Button } from '@/components/ui/button'
import SettingsDialog from '@/components/SettingsDialog.vue'
</script>

<template>
  <div class="h-full max-w-[1200px] mx-auto pt-16 flex flex-col justify-between items-center">
    <header class="text-center">
      <h1 class="text-5xl text-gray-800 font-bold mb-2">Hangman Challenge</h1>
      <p class="text-xl text-gray-400">Can you guess the word before time runs out?</p>
    </header>
    <div>
      <nav class="flex flex-col gap-4">
        <Button>
          <router-link to="/game">Start Game</router-link>
        </Button>
        <SettingsDialog />
        <Button>
          <router-link to="/scoreboard">Scoreboard</router-link>
        </Button>
      </nav>
    </div>

    <footer class="text-gray-400 mb-6">
      <p>Tip: Use jokers to reveal letters or remove wrong options!</p>
    </footer>
  </div>
</template>

<style scoped>
</style>
