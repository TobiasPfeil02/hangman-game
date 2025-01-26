import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import GameBoard from '@/components/GameBoard.vue' // Replace with the actual path
import { useGameStore } from '@/stores/game.ts'
import { fetchWord, fetchWordMeaning } from '@/api/wordService.ts'

vi.mock('@/api/wordService.ts', () => ({
  fetchWord: vi.fn(() => Promise.resolve('TEST')),
  fetchWordMeaning: vi.fn(() => Promise.resolve('A procedure intended to establish a result.')),
}))
describe('GameBoard.vue', () => {
  let wrapper: VueWrapper
  let gameStore: ReturnType<typeof useGameStore>

  beforeEach(() => {
    wrapper = mount(GameBoard, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              game: {
                timer: 60,
                word: '',
                wordMeaning: '',
                correctLetters: [],
                wrongAttempts: 0,
                maxAttempts: 6,
                gameOver: false,
              },
            },
          }),
        ],
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    gameStore = useGameStore()
  })

  it('initializes the game and fetches a word', async () => {
    expect(fetchWord).toHaveBeenCalled()
    expect(fetchWordMeaning).toHaveBeenCalledWith('TEST')
    expect(gameStore.setWord).toHaveBeenCalledWith('TEST')
    expect(gameStore.startTimer).toHaveBeenCalled()
  })

  it('renders the timer, hangman, and keyboard components', () => {
    expect(wrapper.findComponent({ name: 'TimerCard' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'Hangman' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'KeyBoard' }).exists()).toBe(true)
  })

  it('displays the correct letters and underscores for the word', async () => {
    gameStore.word = 'TEST'
    gameStore.correctLetters = ['T', 'E']
    await wrapper.vm.$nextTick()

    const displayedWord = wrapper.findAll('h1 span').map((span) => span.text())
    expect(displayedWord).toEqual(['T', 'E', '_', 'T'])
  })

  it('shows success screen when the player guesses the word', async () => {
    gameStore.correctLetters = ['T', 'E', 'S']
    gameStore.word = 'TEST'
    gameStore.gameOver = true
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Success')
    expect(wrapper.text()).toContain('You guessed the correct word: TEST !')
    expect(wrapper.text()).toContain('TEST means A procedure intended to establish a result.')
  })

  it('shows game over screen when wrong attempts exceed max attempts', async () => {
    gameStore.wrongAttempts = 6
    gameStore.word = 'TEST'
    gameStore.gameOver = true
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Game Over')
    expect(wrapper.text()).toContain('The word we were looking for was: TEST')
  })

  it('shows game over screen when the timer runs out', async () => {
    gameStore.timer = 0
    gameStore.word = 'TEST'
    gameStore.gameOver = true
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Game Over')
    expect(wrapper.text()).toContain('You ran out of time!')
    expect(wrapper.text()).toContain('The word we were looking for was: TEST')
  })

  it('resets the game when the Try Again button is clicked', async () => {
    gameStore.wrongAttempts = 6
    gameStore.wrongLetters = ['A', 'B', 'C']
    gameStore.correctLetters = ['T']
    gameStore.gameOver = true
    await wrapper.vm.$nextTick()
    const tryAgainButton = wrapper.findAll('button').find((button) => button.text() === 'Try Again')
    await tryAgainButton?.trigger('click')
    expect(gameStore.correctLetters.length).toBe(0)
    expect(gameStore.wrongLetters.length).toBe(0)
    expect(gameStore.wrongAttempts).toBe(0)
  })
})
