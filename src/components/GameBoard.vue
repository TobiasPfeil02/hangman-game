<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { fetchWord, fetchWordMeaning } from '@/api/wordService.ts'
import { onMounted, ref } from 'vue'
import KeyBoard from '@/components/KeyBoard.vue'
import { useGameStore } from '@/stores/game.ts'
import Hangman from '@/components/Hangman.vue'

const word = ref()
const game = useGameStore()

function initWord() {
  fetchWord().then((res) => {
    word.value = res
    game.setWord(word.value)
  })
  fetchWordMeaning(word.value).then((res) => {
    game.setWordMeaning(res)
  })
}

function resetGame() {
  game.resetGame()
  initWord()
}

function containsAllChars(array: string[], str: string) {
  const uniqueChars = new Set(str)
  return Array.from(uniqueChars).every((char) => array.includes(char))
}

onMounted(() => {
  initWord()
})
</script>

<template>
  <div class="h-full flex flex-col items-center gap-8">
    <div class="h-[50vh] mt-4">
      <Hangman />
    </div>
    <div v-if="containsAllChars(game.correctLetters, game.word)">
      <h2>Success</h2>
      <p>You guessed the correct word: {{ game.word }} !</p>
      <p v-if="game.wordMeaning !== 'Lacking a definition or value.'">
        {{ game.word }} means {{ game.wordMeaning }}
      </p>
      <button class="btn-primary" @click="resetGame()">Try Again</button>
    </div>
    <div
      v-else-if="game.wrongAttempts < game.maxAttempts"
      class="w-full flex flex-col justify-center items-center gap-10"
    >
      <h1 v-if="word">
        <span v-for="(char, index) in word.split('')" v-bind:key="char + index" class="text-4xl">{{
          game.correctLetters.includes(char) ? char : '_ '
        }}</span>
      </h1>
      <KeyBoard />
    </div>

    <div v-else class="text-center flex flex-col justify-center items-center gap-2">
      <h2 class="text-2xl">Game Over</h2>
      <p class="text-lg">The word we were looking for was: {{ game.word }}</p>
      <p v-if="game.wordMeaning !== 'Lacking a definition or value.'" class="text-lg">
        {{ game.word }} means {{ game.wordMeaning }}
      </p>
      <Button class="btn-primary" @click="resetGame()">Try Again</Button>
    </div>
  </div>
</template>

<style scoped></style>
