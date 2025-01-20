<script setup lang="ts">
import { fetchWord, fetchWordMeaning } from '@/api/wordService.ts'
import { onMounted, ref } from 'vue'
import KeyBoard from '@/components/KeyBoard.vue'
import { useGameStore } from '@/stores/game.ts'

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
  <div v-if="containsAllChars(game.correctLetters, game.word)" class="game-board">
    <h2>Success</h2>
    <p>You guessed the correct word: {{ game.word }} !</p>
    <p v-if="game.wordMeaning !== 'Lacking a definition or value.'">
      {{ game.word }} means {{ game.wordMeaning }}
    </p>
    <button class="btn-primary" @click="resetGame()">Try Again</button>
  </div>
  <div class="game-board" v-else-if="game.wrongAttempts < game.maxAttempts">
    <h1 v-if="word">
      <span v-for="(char, index) in word.split('')" v-bind:key="char + index">{{
        game.correctLetters.includes(char) ? char : '_ '
      }}</span>
    </h1>
    <KeyBoard />
  </div>

  <div v-else class="game-board">
    <h2>Game Over</h2>
    <p>The word we were looking for was: {{ game.word }}</p>
    <p v-if="game.wordMeaning !== 'Lacking a definition or value.'">
      {{ game.word }} means {{ game.wordMeaning }}
    </p>
    <button class="btn-primary" @click="resetGame()">Try Again</button>
  </div>
</template>

<style scoped>
.game-board{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
</style>
