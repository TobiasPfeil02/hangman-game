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
      game.jokerHint = 0
      game.jokerRemoveLetter = 0
      break
    case "medium":
      game.timer = 30
      game.wordLength = 8
      game.jokerHint = 1
      game.jokerRemoveLetter = 3
      break
    case "easy":
      game.timer = 40
      game.wordLength = 5
      game.jokerHint = 2
      game.jokerRemoveLetter = 4
      break
  }
}
export function containsAllChars(array: string[], str: string) {
  if (!str || str.length === 0) return false
  const uniqueChars = new Set(str)
  return Array.from(uniqueChars).every((char) => array.includes(char))
}

export function saveToLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromLocalStorage(key: string) {
  const saved = localStorage.getItem(key)
  return saved ? JSON.parse(saved) : null
}
