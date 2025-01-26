import { defineStore } from 'pinia'
import type { Difficulty } from '@/types/difficulty.enum.ts'
import { containsAllChars, switchDifficulty } from '@/lib/utils.ts'

export const useGameStore = defineStore('game', {
  state: () => ({
    word: '',
    wordMeaning: '',
    correctLetters: [] as string[],
    wrongLetters: [] as string[],
    wrongAttempts: 0,
    maxAttempts: 6,
    timer: 30,
    wordLength: 0,
    difficulty: 'easy' as Difficulty,
    isRunning: false,
    gameOver: false,
  }),
  actions: {
    setWord(newWord: string) {
      this.word = newWord.toUpperCase()
    },
    setWordMeaning(newWordMeaning: string) {
      this.wordMeaning = newWordMeaning
    },
    setWordLength(newWordLength: number) {
      this.wordLength = newWordLength
    },
    setTimer(newTimer: number) {
      this.timer = newTimer
    },
    startTimer() {
      this.isRunning = true
    },
    pauseTimer() {
      this.isRunning = false
    },
    setDifficulty(newDifficulty: Difficulty) {
      this.difficulty = newDifficulty
      switchDifficulty(newDifficulty)
      console.log(this.difficulty)
    },
    guessLetter(letter: string) {
      letter = letter.toUpperCase()
      if (this.word.includes(letter)) {
        this.correctLetters.push(letter)
        if (containsAllChars(this.correctLetters, this.word)) {
          this.triggerGameOver()
        }
        return true
      } else {
        this.wrongLetters.push(letter)
        this.wrongAttempts++
        if (this.wrongAttempts >= this.maxAttempts) {
          this.triggerGameOver()
        }
        return false
      }
    },
    triggerGameOver() {
      console.log('Game Over!')
      this.isRunning = false
      this.gameOver = true
    },
    resetGame() {
      this.word = ''
      this.correctLetters = []
      this.wrongLetters = []
      this.wrongAttempts = 0
      this.gameOver = false
      this.isRunning = false
    },
  },
})
