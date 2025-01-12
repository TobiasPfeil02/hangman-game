import { defineStore } from 'pinia'

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
    guessLetter(letter: string) {
      letter = letter.toUpperCase()
      if (this.word.includes(letter)) {
        this.correctLetters.push(letter)
        return true
      } else {
        this.wrongLetters.push(letter)
        this.wrongAttempts++
        return false
      }
    },
    resetGame() {
      this.word = ''
      this.correctLetters = []
      this.wrongLetters = []
      this.wrongAttempts = 0
    },
  },
})
