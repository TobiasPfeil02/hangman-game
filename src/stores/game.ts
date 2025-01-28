import { defineStore } from 'pinia'
import type { Difficulty } from '@/types/difficulty.enum.ts'
import {
  containsAllChars,
  loadFromLocalStorage,
  saveToLocalStorage,
  switchDifficulty,
} from '@/lib/utils.ts'
import type { Score } from '@/types/score.ts'

export const useGameStore = defineStore('game', {
  state: () => ({
    word: '',
    wordMeaning: '',
    correctLetters: [] as string[],
    wrongLetters: [] as string[],
    wrongAttempts: 0,
    maxAttempts: 6,
    timer: 30,
    remainingTime: 30,
    wordLength: 0,
    jokerHint: 2,
    jokerRemoveLetter: 2,
    jokersUsed: 0,
    difficulty: 'easy' as Difficulty,
    isRunning: false,
    gameOver: false,
    topScores: loadFromLocalStorage('scores') as Score[],
    addedCurrentScore: false,
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
      this.remainingTime = newTimer
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
      this.remainingTime = this.timer
      this.addedCurrentScore = false
      this.jokersUsed = 0
      switchDifficulty(this.difficulty)
    },
    addScore(score: Score) {
      if (this.addedCurrentScore) return
      if (!this.topScores) {
        this.topScores = []
      }
      this.topScores.push(score)
      this.topScores.sort((a, b) => b.score - a.score)
      if (this.topScores.length > 10) {
        this.topScores.pop()
      }
      this.addedCurrentScore = true
      saveToLocalStorage('scores', this.topScores)
    },
    calculateScore(timeTaken: number) {
      return Math.round(1000 / (1 + timeTaken / this.timer) - (50 * this.jokersUsed) - (25 * this.wrongAttempts))
    },
  },
})
