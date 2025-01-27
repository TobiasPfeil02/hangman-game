<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { TooltipTrigger, Tooltip, TooltipProvider, TooltipContent } from '@/components/ui/tooltip'
import { useGameStore } from '@/stores/game.ts'
import { QWERTY } from '@/lib/constants.ts'

const props = defineProps<{
  type: 'hint' | 'removeLetter'
  amount: number
}>()
const game = useGameStore()

function handleClick() {
  const wordArray = game.word.split('')
  if (props.type === 'hint') {
    const remainingLetters = wordArray.filter((element) => !game.correctLetters.includes(element))
    game.guessLetter(remainingLetters[Math.floor(Math.random() * remainingLetters.length)])
    game.jokerAmount1--
  }
  if (props.type === 'removeLetter') {
    const qwertyKeys = QWERTY.flat()
    const remainingLetters = qwertyKeys.filter((element) => !game.wrongLetters.includes(element))
    const remainingWrongLetters = remainingLetters.filter((element) => !wordArray.includes(element))
    game.wrongLetters.push(
      remainingWrongLetters[Math.floor(Math.random() * remainingWrongLetters.length)],
    )
    game.jokerAmount2--
  }
}
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Button :disabled="amount === 0 || game.gameOver" class="relative" @click="handleClick">
          A
          <sup v-if="type === 'hint'">+</sup>
          <sup v-if="type === 'removeLetter'">-</sup>
          <div
            class="absolute -top-3 -right-3 bg-gray-200 text-gray-900 text-xs font-bold rounded-full px-2 py-1"
          >
            {{ amount }}
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p v-if="amount === 0">You don't have jokers left...</p>
        <p v-if="type === 'hint'">Reveal a letter from the searched word.</p>
        <p v-if="type === 'removeLetter'">
          Remove a letter that doesn't occur in the searched word.
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style scoped></style>
