import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Difficulty } from '@/types/difficulty.enum.ts'
import { useGameStore } from '@/stores/game.ts'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function switchDifficulty(difficulty: Difficulty){
  const game = useGameStore()
  switch (difficulty) {
    case "hard":
      game.timer = 20
      game.wordLength = 12
      break
    case "medium":
      game.timer = 30
      game.wordLength = 8
      break
    case "easy":
      game.timer = 40
      game.wordLength = 5
      break
  }
}
export function containsAllChars(array: string[], str: string) {
  if (!str || str.length === 0) return false
  const uniqueChars = new Set(str)
  return Array.from(uniqueChars).every((char) => array.includes(char))
}
