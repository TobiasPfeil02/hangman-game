<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Score } from '@/types/score.ts'

defineProps({
  filteredScores: {
    type: Array<Score>,
    required: true,
  },
})
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Position</TableHead>
        <TableHead>Score</TableHead>
        <TableHead>Nickname</TableHead>
        <TableHead>Difficulty</TableHead>
        <TableHead>Time taken</TableHead>
        <TableHead>Word</TableHead>
        <TableHead>Meaning</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(attempt, index) in filteredScores" :key="index" class="w-full">
        <TableCell>{{ index + 1 }}</TableCell>
        <TableCell>{{ attempt.score }}</TableCell>
        <TableCell>{{ attempt.nickname }}</TableCell>
        <TableCell>{{ attempt.difficulty }}</TableCell>
        <TableCell>{{ attempt.timeTaken }}</TableCell>
        <TableCell>{{ attempt.word }}</TableCell>
        <TableCell>{{ attempt.meaning }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
