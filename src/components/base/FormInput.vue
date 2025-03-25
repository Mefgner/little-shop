<script setup lang="ts">
import { ref } from 'vue'

const val = ref('')
</script>

<template>
  <input
    v-model="val"
    @change="(value) => $emit('modelValue', val)"
    class="w-full rounded border border-gray-300 p-2"
  />
</template>
