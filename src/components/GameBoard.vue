<script setup lang="ts">
import { fetchWord } from '@/api/wordService.ts'
import { onMounted, ref } from 'vue'

const word = ref()

function handleFetch() {
  fetchWord().then((res) => {
    word.value = res
  })
}

onMounted(() => {
  handleFetch()
})
</script>

<template>
  <h1>{{ word}}</h1>
</template>

<style scoped></style>
