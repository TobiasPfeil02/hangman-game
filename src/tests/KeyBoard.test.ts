import { describe, it, expect, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import Keyboard from '@/components/KeyBoard.vue'
import KeyButton from '@/components/KeyButton.vue'
import { useGameStore } from '@/stores/game.ts'

describe('Keyboard.vue', () => {
  it('renders all keyboard keys correctly', () => {
    const wrapper: VueWrapper = mount(Keyboard, {
      global: {
        components: { KeyButton },
        plugins: [
          createTestingPinia({
            createSpy: () => vi.fn(),
          }),
        ],
      },
    })

    const keys: string[] = [
      'Q',
      'W',
      'E',
      'R',
      'T',
      'Y',
      'U',
      'I',
      'O',
      'P',
      'A',
      'S',
      'D',
      'F',
      'G',
      'H',
      'J',
      'K',
      'L',
      'Z',
      'X',
      'C',
      'V',
      'B',
      'N',
      'M',
    ]

    keys.forEach((key: string) => {
      expect(wrapper.text()).toContain(key)
    })
  })

  it('calls the game store method when a key is clicked', async () => {
    const wrapper: VueWrapper = mount(Keyboard, {
      global: {
        components: { KeyButton },
        plugins: [
          createTestingPinia({
            createSpy: () => vi.fn(),
            stubActions: false,
          }),
        ],
      },
    })

    const gameStore = useGameStore()
    const keyElement = wrapper.findAllComponents(KeyButton).find((button) => button.text() === 'A')

    expect(keyElement).toBeTruthy() // Ensure the key was found

    await keyElement?.trigger('click')

    expect(gameStore.guessLetter).toHaveBeenCalledWith('A')
  })

  it('applies the correct state classes based on game store state', () => {
    const wrapper: VueWrapper = mount(Keyboard, {
      global: {
        components: { KeyButton },
        plugins: [
          createTestingPinia({
            createSpy: () => vi.fn(),
            initialState: {
              game: {
                correctLetters: ['A', 'S'],
                wrongLetters: ['Z'],
              },
            },
          }),
        ],
      },
    })

    const correctKey = wrapper
      .findAllComponents<typeof KeyButton>(KeyButton)
      .find((button) => button.text() === 'A')
    const wrongKey = wrapper
      .findAllComponents<typeof KeyButton>(KeyButton)
      .find((button) => button.text() === 'Z')
    const defaultKey = wrapper
      .findAllComponents<typeof KeyButton>(KeyButton)
      .find((button) => button.text() === 'M')

    expect(correctKey?.classes()).toContain('btn-success')
    expect(wrongKey?.classes()).toContain('btn-error')
    expect(defaultKey?.classes()).toContain('btn-default')
  })
})
