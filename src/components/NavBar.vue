<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <nav class="w-full flex flex-row justify-start py-4 px-6">
    <div class="max-w-screen-xl w-full m-auto">
      <Button>
        <router-link to="/">&lt; Home</router-link>
      </Button>
    </div>
  </nav>
</template>
