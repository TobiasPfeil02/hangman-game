<script setup lang="ts">
import GameBoard from '@/components/GameBoard.vue'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <NavBar :show-info="true" class="w-full z-10 relative" />
  <GameBoard />
</template>
