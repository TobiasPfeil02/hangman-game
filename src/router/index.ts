import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import StartGameView from '@/views/StartGameView.vue'
import ScoreboardView from '@/views/ScoreboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/start',
      name: 'start',
      component: StartGameView,
    },
    {
      path: '/game',
      name: 'game',
      component: GameView,
    },
    {
      path: '/scoreboard',
      name: 'scoreboard',
      component: ScoreboardView,
    }
  ],
})

export default router
