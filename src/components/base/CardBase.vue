<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  name: string
  img: string
  price: string
  handler: () => void
}>()
</script>

<template>
  <a
    href=""
    @click="props.handler()"
    class="flex flex-col justify-between rounded-lg border-2 border-gray-100 bg-white p-6 sm:w-fit dark:border-gray-800 dark:bg-gray-900"
  >
    <img
      :src="props.img"
      alt="product"
      class="m-auto w-full rounded-lg object-cover text-center lg:max-w-44"
    />
    <div class="mt-4 flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold">{{ props.name }}</h3>
        <p class="text-gray-500">{{ props.price }}</p>
      </div>
    </div>
  </a>
</template>
