<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/game.ts'
import { Badge } from '@/components/ui/badge'

const props = defineProps({
  initialTime: {
    type: Number,
    default: 60,
  },
})

const gameStore = useGameStore()
const time = ref(props.initialTime)
const timerInterval = ref<number | null>(null)

const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60)
  const seconds = time.value % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const startTimer = () => {
  if (timerInterval.value !== null) {
    clearInterval(timerInterval.value)
  } else {
    timerInterval.value = window.setInterval(() => {
      if (time.value > 0) {
        time.value--
      } else {
        gameStore.triggerGameOver()
        resetTimer()
      }
    }, 1000)
  }
}

const pauseTimer = () => {
  gameStore.pauseTimer()
  if (timerInterval.value !== null) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
}

const resetTimer = () => {
  pauseTimer()
  time.value = props.initialTime
}

// Cleanup on unmount
onUnmounted(() => {
  if (timerInterval.value !== null) {
    clearInterval(timerInterval.value)
  }
})

watch(
  () => gameStore.isRunning,
  (isRunning) => {
    if (isRunning) {
      startTimer()
    } else {
      pauseTimer()
    }
  },
)
watch(
  () => gameStore.gameOver,
  (gameOver) => {
    if (gameOver) {
      resetTimer()
    }
  },
)
</script>

<template>
  <div class="mx-auto my-0 w-1/5 h-16">
    <Badge
      class="w-full h-full text-center text-2xl justify-center"
      :variant="time > 10 ? 'default' : 'destructive'"
    >
      {{ formattedTime }}
    </Badge>
  </div>
</template>
