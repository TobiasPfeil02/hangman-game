<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useGameStore } from '@/stores/game.ts'

const game = useGameStore();
</script>

<template>
  <nav class="w-full flex flex-row justify-start py-4 px-6">
    <div class="max-w-screen-xl w-full m-auto flex items-center justify-between">
      <Button>
        <router-link to="/">&lt; Home</router-link>
      </Button>
      <Badge>{{game.difficulty}}</Badge>
    </div>
  </nav>
</template>
