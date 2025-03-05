<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>
    <div class="fixed inset-0 z-30 bg-gray-900 opacity-50 dark:opacity-75"></div>
    <div class="fixed inset-5 z-50 md:py-4">
      <div
        class="mx-auto flex h-full max-h-full flex-col rounded-2xl bg-white shadow-lg md:w-[660px] dark:bg-gray-900"
      >
        <div
          class="flex min-h-16 items-center justify-between border-b-2 border-gray-300 px-8 dark:border-gray-700"
        >
          <h2 class="text-xl font-semibold">{{ props.name }}</h2>
          <button @click="$emit('close')" class="cursor-pointer text-2xl">&times;</button>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
