<script setup lang="ts">
import { useGameStore } from '@/stores/game.ts'

const game = useGameStore()
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="250" viewBox="0 0 200 250" style="width: 100%; height: 100%">
    <rect width="200" height="250" fill="#96bbda" x="0" y="0"/>
    <rect width="200" height="100" fill="#81af56" x="0" y="230"/>
    <circle r="40" cy="230" cx="40" fill="#81af56"/>
    <circle r="60" cy="230" cx="90" fill="#81af56"/>
    <circle r="50" cy="230" cx="150" fill="#81af56"/>
    <!-- Base -->
    <g v-if="game.wrongAttempts > 0">
      <polygon points="10,250 20,230 180,230 190,250 10,250" fill="#4D2600"/>
    </g>
    <!-- Pole -->
    <line v-if="game.wrongAttempts > 1" x1="50" y1="230" x2="50" y2="50" stroke="#4D2600" stroke-width="4"/>

    <!-- Top beam -->
    <line v-if="game.wrongAttempts > 2" x1="48" y1="50" x2="151.5" y2="50" stroke="#4D2600" stroke-width="4"/>


    <line v-if="game.wrongAttempts > 3" x1="50" y1="80" x2="80" y2="50" stroke="#4D2600" stroke-width="4"/>
    <!-- Rope -->
    <line v-if="game.wrongAttempts > 4" x1="150" y1="50" x2="150" y2="80" stroke="#4D2600" stroke-width="3"/>

    <!-- Placeholder for the head -->

    <g v-if="game.wrongAttempts > 5" class="stick-man">
    <circle cx="150" cy="95" r="15" stroke="black" stroke-width="3" fill="none"/>
      <!-- Placeholder for the body -->
      <line x1="150" y1="110" x2="150" y2="160" stroke="black" stroke-width="3"/>

      <!-- Placeholder for left arm -->
      <line x1="150" y1="120" x2="130" y2="140" stroke="black" stroke-width="3"/>

      <!-- Placeholder for right arm -->
      <line x1="150" y1="120" x2="170" y2="140" stroke="black" stroke-width="3"/>

      <!-- Placeholder for left leg -->
      <line x1="150" y1="160" x2="130" y2="190" stroke="black" stroke-width="3"/>

      <!-- Placeholder for right leg -->
      <line x1="150" y1="160" x2="170" y2="190" stroke="black" stroke-width="3"/>
    </g>
  </svg>

</template>

<style scoped>

</style>
