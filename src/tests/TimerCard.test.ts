import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TimerCard from '@/components/TimerCard.vue'
import { useGameStore } from '@/stores/game.ts'

describe('TimerCard.vue', () => {
  let wrapper: VueWrapper
  let gameStore: ReturnType<typeof useGameStore>

  beforeEach(() => {
    vi.useFakeTimers()

    wrapper = mount(TimerCard, {
      props: {
        initialTime: 60,
      },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              game: {
                isRunning: false,
                gameOver: false,
              },
            },
          }),
        ],
      },
    })

    gameStore = useGameStore()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  it('renders the initial time correctly', () => {
    expect(wrapper.text()).toContain('01:00')
  })

  it('updates time when the timer starts', async () => {
    gameStore.isRunning = true
    await wrapper.vm.$nextTick()

    vi.advanceTimersByTime(2000) // Simulate 2 seconds
    await wrapper.vm.$nextTick() // Ensure DOM updates

    expect(wrapper.text()).toContain('00:58')
  })

  it('triggers gameOver and resets the timer when time runs out', async () => {
    vi.spyOn(gameStore, 'triggerGameOver')
    gameStore.isRunning = true
    await wrapper.vm.$nextTick()

    // Simulate 62 seconds
    vi.advanceTimersByTime(62000)
    await wrapper.vm.$nextTick() // Ensure DOM updates

    // Check that gameOver was triggered and the timer reset
    expect(gameStore.triggerGameOver).toHaveBeenCalled()
    expect(wrapper.text()).toContain('01:00') // Resets to initial time of 60
  })

  it('pauses the timer when gameStore.isRunning is set to false', async () => {
    gameStore.isRunning = true
    await wrapper.vm.$nextTick()

    vi.advanceTimersByTime(2000) // Simulate 2 seconds
    await wrapper.vm.$nextTick() // Ensure DOM updates

    gameStore.isRunning = false
    await wrapper.vm.$nextTick()

    const pausedTime = wrapper.text()

    vi.advanceTimersByTime(2000) // Simulate 2 more seconds
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toBe(pausedTime)
  })

  it('changes badge variant based on time left', async () => {
    gameStore.isRunning = true
    await wrapper.vm.$nextTick()

    vi.advanceTimersByTime(53000) // Simulate 3 seconds
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.inline-flex').classes()).toContain('bg-destructive') // Less than 10 seconds left

    // Set a new initial time and reset timer manually
    await wrapper.setProps({ initialTime: 60 })
    // @ts-expect-error vitest doesn't know 'time' exists here
    wrapper.vm.time = 60 // Reset the time manually
    vi.advanceTimersByTime(3000) // Simulate 3 seconds
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.inline-flex').classes()).toContain('bg-primary')
  })

  it('cleans up the interval on unmount', () => {
    wrapper.unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
})
