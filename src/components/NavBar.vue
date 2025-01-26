<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <nav class="w-full flex flex-row justify-start py-4 px-6">
    <Button>
      <router-link to="/">&lt; Home</router-link>
    </Button>
  </nav>
</template>
