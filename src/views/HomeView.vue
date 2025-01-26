<script setup lang="ts">
import {Button} from "@/components/ui/button"
import SettingsDialog from '@/components/SettingsDialog.vue'
import hangman from "@/assets/hangman.svg"
</script>

<template>
  <div class="h-full p-2 flex flex-col justify-between items-center mx-auto bg-cover bg-center"
        :style='{backgroundImage: `url("${hangman}")`}'>
    <header class="mt-4">
      <h1 class="text-center font-bold text-4xl mb-2">Hangman Challenge</h1>
      <p class="text-[#34495e]">Can you guess the word before time runs out?</p>
    </header>

    <nav class="flex flex-col gap-4">
      <Button>
        <router-link to="/game" class="btn btn-primary">Start Game</router-link>
      </Button>
      <SettingsDialog/>
      <Button>
        <router-link to="/scoreboard" class="btn btn-secondary">Scoreboard</router-link>
      </Button>
    </nav>

    <footer class="p-4 text-[0.9em] text-gray-400 bg-gray-700 rounded-md">
      <p>Tip: Use jokers to reveal letters or remove wrong options!</p>
    </footer>
  </div>
</template>

<style scoped></style>
