<script setup lang="ts">
import KeyButton from '@/components/KeyButton.vue'
import { useGameStore } from '@/stores/game.ts'

const game = useGameStore()
const qwertyKeyboard = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

function handleKeyPress(key: string) {
  game.guessLetter(key)
}
</script>

<template>
  <div class="keyboard-wrapper">
    <div v-for="(row, rowIndex) in qwertyKeyboard" :key="rowIndex" class="keyboard-row">
      <KeyButton
        v-for="key in row"
        :key="key"
        @click="handleKeyPress(key)"
        class="keyboard-key"
        :state="
          game.correctLetters.includes(key)
            ? 'success'
            : game.wrongLetters.includes(key)
              ? 'error'
              : 'default'
        "
      >
        {{ key }}
      </KeyButton>
    </div>
  </div>
</template>

<style scoped>
.keyboard-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.keyboard-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
</style>
