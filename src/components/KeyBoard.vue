<script setup lang="ts">
import KeyButton from '@/components/KeyButton.vue'
import { QWERTY as qwertyKeyboard } from '@/lib/constants.ts'
import { useGameStore } from '@/stores/game.ts'

const game = useGameStore()


function handleKeyPress(key: string) {
  game.guessLetter(key)
}
</script>

<template>
  <div class="keyboard-flex keyboard-wrapper w-full">
    <div
      v-for="(row, rowIndex) in qwertyKeyboard"
      :key="rowIndex"
      class="keyboard-flex keyboard-row max-w-full"
    >
      <KeyButton
        v-for="key in row"
        :key="key"
        @click="handleKeyPress(key)"
        class="w-[8%] lg:w-[5%] max-w-[4rem] h-12 font-semibold"
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
.keyboard-flex {
  display: flex;
  gap: 0.5rem;
}

.keyboard-wrapper {
  flex-direction: column;
}

.keyboard-row {
  align-items: center;
  justify-content: center;
}
</style>
