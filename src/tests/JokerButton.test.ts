import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import JokerButton from '@/components/JokerButton.vue' // Replace with the actual path
import { useGameStore } from '@/stores/game.ts'

vi.mock('@/lib/constants.ts', () => ({
  QWERTY: [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ],
}))

describe('JokerButton.vue', () => {
  let wrapper: VueWrapper
  let gameStore: ReturnType<typeof useGameStore>

  beforeEach(() => {
    wrapper = mount(JokerButton, {
      props: {
        type: 'hint',
        amount: 3,
      },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              game: {
                word: 'TEST',
                correctLetters: [],
                wrongLetters: [],
                jokerHint: 3,
                jokerRemoveLetter: 2,
                gameOver: false,
              },
            },
            stubActions: false,
          }),
        ],
      },
    })

    gameStore = useGameStore()
  })

  it('renders the button with the correct amount', () => {
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(wrapper.text()).toContain('3')
  })

  it('disables the button when amount is 0', async () => {
    await wrapper.setProps({ amount: 0 })
    const button = wrapper.find('button').find('button')

    expect(button.attributes('disabled')).toBeDefined()
  })

  it('disables the button when game is over', async () => {
    gameStore.gameOver = true
    await wrapper.vm.$nextTick()
    const button = wrapper.find('button').find('button')
    
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('handles hint joker correctly', async () => {
    const button = wrapper.find('button').find('button')
    await button.trigger('click')

    expect(gameStore.jokerHint).toBe(2) // Hint count decreased
    expect(gameStore.correctLetters.length).toBe(1) // One letter revealed
  })

  it('handles remove letter joker correctly', async () => {
    await wrapper.setProps({ type: 'removeLetter', amount: 2 })
    const button = wrapper.find('button').find('button')
    await button.trigger('click')

    expect(gameStore.jokerRemoveLetter).toBe(1) // Remove letter count decreased
    expect(gameStore.wrongLetters.length).toBe(1) // One letter added to wrongLetters
  })
})
