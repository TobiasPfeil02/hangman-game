import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import ScoreboardView from '@/views/ScoreboardView.vue'; // Adjust path if needed
import { useGameStore } from '@/stores/game.ts';
import ScoreCard from '@/components/ScoreCard.vue';

describe('ScoreboardView.vue', () => {
  let wrapper: VueWrapper;
  let gameStore: ReturnType<typeof useGameStore>;

  beforeEach(() => {
    wrapper = mount(ScoreboardView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              game: {
                topScores: [
                  { word: 'TEST', meaning: 'A procedure to establish a result', timeTaken: 90, difficulty: 'easy', score: 100 },
                  { word: 'GAME', meaning: 'An activity for amusement', timeTaken: 130, difficulty: 'medium', score: 80 },
                  { word: 'HARD', meaning: 'Difficult', timeTaken: 200, difficulty: 'hard', score: 60 },
                ],
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
    });

    gameStore = useGameStore();
  });

  it('renders a list of scores using ScoreCard components', () => {
    const scoreCards = wrapper.findAllComponents(ScoreCard);
    expect(scoreCards).toHaveLength(3);

    expect(scoreCards[0].props()).toEqual({
      position: 1,
      word: 'TEST',
      meaning: 'A procedure to establish a result',
      timeTaken: '90s',
      difficulty: 'EASY',
      score: 100,
    });

    expect(scoreCards[1].props()).toEqual({
      position: 2,
      word: 'GAME',
      meaning: 'An activity for amusement',
      timeTaken: '130s',
      difficulty: 'MEDIUM',
      score: 80,
    });

    expect(scoreCards[2].props()).toEqual({
      position: 3,
      word: 'HARD',
      meaning: 'Difficult',
      timeTaken: '200s',
      difficulty: 'HARD',
      score: 60,
    });
  });

  it('filters scores by difficulty', async () => {
    // Default is 'all'
    expect(wrapper.findAllComponents(ScoreCard)).toHaveLength(3);

    // Filter by 'easy'
    const easyButton = wrapper.findAll('button').find(button => button.text() === 'Easy');
    if (easyButton) {
      await easyButton.trigger('click');
    }
    expect(wrapper.findAllComponents(ScoreCard)).toHaveLength(1);
    expect(wrapper.findComponent(ScoreCard).props()).toEqual({
      position: 1,
      word: 'TEST',
      meaning: 'A procedure to establish a result',
      timeTaken: '90s',
      difficulty: 'EASY',
      score: 100,
    });

    // Filter by 'medium'
    const mediumButton = wrapper.findAll('button').find(button => button.text() === 'Medium');
    if (mediumButton) {
      await mediumButton.trigger('click');
    }
    expect(wrapper.findAllComponents(ScoreCard)).toHaveLength(1);
    expect(wrapper.findComponent(ScoreCard).props()).toEqual({
      position: 1,
      word: 'GAME',
      meaning: 'An activity for amusement',
      timeTaken: '130s',
      difficulty: 'MEDIUM',
      score: 80,
    });

    // Filter by 'hard'
    const hardButton = wrapper.findAll('button').find(button => button.text() === 'Hard');
    if (hardButton) {
      await hardButton.trigger('click');
    }
    expect(wrapper.findAllComponents(ScoreCard)).toHaveLength(1);
    expect(wrapper.findComponent(ScoreCard).props()).toEqual({
      position: 1,
      word: 'HARD',
      meaning: 'Difficult',
      timeTaken: '200s',
      difficulty: 'HARD',
      score: 60,
    });

    // Filter by 'all'
    const allButton = wrapper.findAll('button').find(button => button.text() === 'All');
    if (allButton) {
      await allButton.trigger('click');
    }
    expect(wrapper.findAllComponents(ScoreCard)).toHaveLength(3);
  });

  it('shows a message when there are no scores', async () => {
    gameStore.topScores = [];
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('No attempts yet. Play a game to add scores!');
  });
});
