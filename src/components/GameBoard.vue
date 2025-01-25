<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { fetchWord, fetchWordMeaning } from '@/api/wordService.ts'
import { onMounted, ref } from 'vue'
import KeyBoard from '@/components/KeyBoard.vue'
import { useGameStore } from '@/stores/game.ts'
import Hangman from '@/components/Hangman.vue'
import TimerCard from '@/components/TimerCard.vue'
import { containsAllChars } from '@/lib/utils.ts'

const word = ref()
const game = useGameStore()

function initWord() {
  fetchWord().then((res) => {
    word.value = res
    game.setWord(word.value)
    game.startTimer()
  })
  fetchWordMeaning(word.value).then((res) => {
    game.setWordMeaning(res)
  })
}

function resetGame() {
  game.resetGame()
  initWord()
}

onMounted(() => {
  initWord()
})
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center gap-4">
    <TimerCard :initial-time="game.timer" />
    <div class="w-full h-[50vh]">
      <Hangman />
    </div>
    <div v-if="!game.gameOver" class="flex flex-col justify-center items-center gap-4">
      <h1 v-if="word">
        <span v-for="(char, index) in word.split('')" v-bind:key="char + index" class="text-4xl">{{
          game.correctLetters.includes(char) ? char : '_ '
        }}</span>
      </h1>
      <KeyBoard />
    </div>
    <div v-else>
      <div
        v-if="containsAllChars(game.correctLetters, game.word)"
        class="flex flex-col justify-center items-center gap-2"
      >
        <h2 class="text-2xl">Success</h2>
        <p class="text-lg">You guessed the correct word: {{ game.word }} !</p>
        <p v-if="game.wordMeaning !== 'Lacking a definition or value.'">
          {{ game.word }} means {{ game.wordMeaning }}
        </p>
        <Button class="btn-primary" @click="resetGame()">Try Again</Button>
      </div>

      <div
        v-else-if="game.wrongAttempts >= game.maxAttempts"
        class="text-center flex flex-col justify-center items-center gap-2"
      >
        <h2 class="text-2xl">Game Over</h2>
        <p class="text-lg">The word we were looking for was: {{ game.word }}</p>
        <p v-if="game.wordMeaning !== 'Lacking a definition or value.'" class="text-lg">
          {{ game.word }} means {{ game.wordMeaning }}
        </p>
        <Button class="btn-primary" @click="resetGame()">Try Again</Button>
      </div>
      <div v-else class="text-center flex flex-col justify-center items-center gap-2">
        <h2 class="text-2xl">Game Over</h2>
        <p class="text-lg">You ran out of time!</p>
        <p class="text-lg">The word we were looking for was: {{ game.word }}</p>
        <Button class="btn-primary" @click="resetGame()">Try Again</Button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
