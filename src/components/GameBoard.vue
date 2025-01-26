<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { fetchWord, fetchWordMeaning } from '@/api/wordService.ts'
import { onMounted, ref } from 'vue'
import KeyBoard from '@/components/KeyBoard.vue'
import { useGameStore } from '@/stores/game.ts'
import Hangman from '@/components/Hangman.vue'
import TimerCard from '@/components/TimerCard.vue'
import { containsAllChars } from '@/lib/utils.ts'
import type { Score } from '@/types/score'

const word = ref()
const game = useGameStore()

function initWord() {
  fetchWord().then((res) => {
    word.value = res
    game.setWord(word.value)
    game.startTimer()
    fetchWordMeaning(word.value).then((res) => {
      game.setWordMeaning(res)
    })
  })
}

function resetGame() {
  console.log('resetting game')
  game.resetGame()
  initWord()
}

function guessedWordCorrectly(array: string[], str: string) {
  if (containsAllChars(array, str)) {
    game.addScore({
      word: game.word,
      meaning: game.wordMeaning,
      timeTaken: game.timer - game.remainingTime,
      difficulty: game.difficulty,
    } as Score)

    return true
  } else {
    return false
  }
}

onMounted(() => {
  resetGame()
})
</script>

<template>
  <div class="relative">
    <TimerCard :initial-time="game.timer" class="absolute top-6 left-1/2 translate-x-[-50%]" />
    <div class="h-[40vh] xl:h-[50vh]">
      <Hangman />
    </div>
  </div>
  <div v-if="!game.gameOver" class="w-full flex flex-col justify-center items-center gap-10 mt-4">
    <h1 v-if="word" class="flex gap-0.5">
      <span
        v-for="(char, index) in word.split('')"
        v-bind:key="char + index"
        class="text-4xl w-9 text-center"
        >{{ game.correctLetters.includes(char) ? char : '_' }}</span
      >
    </h1>
    <KeyBoard />
  </div>
  <div v-else class="mt-8">
    <div
      v-if="guessedWordCorrectly(game.correctLetters, game.word)"
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
</template>
