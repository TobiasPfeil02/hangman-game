import { describe, it, vi, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import HangmanComponent from '@/components/Hangman.vue';
import { useGameStore } from '@/stores/game.ts';

describe('HangmanComponent.vue', () => {
  let wrapper: VueWrapper;
  let gameStore: ReturnType<typeof useGameStore>;

  beforeEach(() => {
    wrapper = mount(HangmanComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              game: {
                wrongAttempts: 0,
              },
            },
          }),
        ],
      },
    });

    gameStore = useGameStore();
  });

  it('renders the base correctly', () => {
    expect(wrapper.find('rect[fill="#4cbee3"]').exists()).toBe(true); // Sky
    expect(wrapper.find('rect[fill="green"]').exists()).toBe(true);   // Ground
  });

  it('renders the base when wrongAttempts > 0', async () => {
    gameStore.wrongAttempts = 1;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('polygon').exists()).toBe(true); // Base
  });

  it('renders the pole when wrongAttempts > 1', async () => {
    gameStore.wrongAttempts = 2;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('line[x1="50"][x2="50"]').exists()).toBe(true); // Pole
  });

  it('renders the top beam when wrongAttempts > 2', async () => {
    gameStore.wrongAttempts = 3;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('line[x1="48"][x2="151.5"]').exists()).toBe(true); // Top Beam
  });

  it('renders the diagonal support when wrongAttempts > 3', async () => {
    gameStore.wrongAttempts = 4;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('line[x1="50"][y1="80"]').exists()).toBe(true); // Diagonal Support
  });

  it('renders the rope when wrongAttempts > 4', async () => {
    gameStore.wrongAttempts = 5;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('line[x1="150"][y1="50"]').exists()).toBe(true); // Rope
  });

  it('renders the stick figure when wrongAttempts > 5', async () => {
    gameStore.wrongAttempts = 6;
    await wrapper.vm.$nextTick();

    const stickMan = wrapper.find('g.stick-man');
    expect(stickMan.exists()).toBe(true);

    // Check head
    expect(stickMan.find('circle[cx="150"][cy="95"]').exists()).toBe(true);

    // Check body
    expect(stickMan.find('line[x1="150"][y1="110"]').exists()).toBe(true);

    // Check arms
    expect(stickMan.find('line[x1="150"][y1="120"][x2="130"]').exists()).toBe(true); // Left arm
    expect(stickMan.find('line[x1="150"][y1="120"][x2="170"]').exists()).toBe(true); // Right arm

    // Check legs
    expect(stickMan.find('line[x1="150"][y1="160"][x2="130"]').exists()).toBe(true); // Left leg
    expect(stickMan.find('line[x1="150"][y1="160"][x2="170"]').exists()).toBe(true); // Right leg
  });

  it('does not render additional elements when wrongAttempts is 0', () => {
    expect(wrapper.find('polygon').exists()).toBe(false); // Base
    expect(wrapper.find('line[x1="50"]').exists()).toBe(false); // Pole
    expect(wrapper.find('line[x1="48"]').exists()).toBe(false); // Top Beam
    expect(wrapper.find('line[x1="150"]').exists()).toBe(false); // Rope
    expect(wrapper.find('g.stick-man').exists()).toBe(false); // Stick Figure
  });
});
