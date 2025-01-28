<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useGameStore } from '@/stores/game.ts'

const { showInfo = false } = defineProps<{
  showInfo?: boolean
}>()
const game = useGameStore()
</script>

<template>
  <nav class="w-full flex flex-row justify-start py-4 px-6">
    <div class="max-w-screen-xl w-full m-auto flex items-center justify-between">
      <Button>
        <router-link to="/">&lt; Home</router-link>
      </Button>
      <div class="flex items-center justify-center gap-2" v-if="showInfo">
        <p>{{ game.nickname }} playing a game on</p>
        <Badge>{{ game.difficulty }}</Badge>
      </div>
    </div>
  </nav>
</template>
