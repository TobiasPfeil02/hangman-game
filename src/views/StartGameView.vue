<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Difficulty } from '@/types/difficulty.enum.ts'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/stores/game.ts'
import NavBar from '@/components/NavBar.vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { FormControl, FormLabel, FormField, FormItem } from '@/components/ui/form'
import router from '@/router'
import { cn } from '@/lib/utils.ts'

const game = useGameStore()

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(20),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  game.nickname = values.username
  router.push({ path: '/game' })
})

const setDifficulty = (event: Event, difficulty: Difficulty) => {
  event.preventDefault()
  game.setDifficulty(difficulty)
}
</script>

<template>
  <NavBar />
  <form
    @submit="onSubmit"
    :class="
      cn(
        'flex flex-col items-center justify-center gap-5',
        'h-[90dvh] sm:w-1/2 md:w-2/6 lg:w-1/3',
        'mx-auto px-3',
      )
    "
  >
    <h1 class="text-center font-bold text-4xl mb-6">Configure Game</h1>
    <FormField v-slot="{ componentField }" name="username">
      <FormItem class="w-full">
        <FormLabel>Choose a nickname:</FormLabel>
        <FormControl>
          <Input placeholder="HangmanProfi123" v-model="game.nickname" v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>
    <div class="space-y-2 w-full">
      <h2 class="text-sm font-medium leading-none">Select difficulty:</h2>
      <div class="flex flex-row gap-2">
        <Button
          v-for="difficulty in Object.values(Difficulty)"
          :key="difficulty"
          variant="outline"
          class="font-semibold hover:border-green-700"
          :class="{
            'text-white hover:text-white  border-green-700 bg-green-700 hover:bg-green-700':
              game.difficulty == difficulty,
          }"
          @click="(e) => setDifficulty(e, difficulty)"
        >
          {{ difficulty.charAt(0).toUpperCase() + difficulty.slice(1) }}
        </Button>
      </div>
    </div>
    <Button type="submit" class="mt-12">Start Game</Button>
  </form>
</template>
