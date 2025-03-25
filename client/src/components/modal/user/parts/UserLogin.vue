<script setup lang="ts">
import PrimaryBtn from '@/components/base/PrimaryBtn.vue'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

<template>
  <form class="flex w-[660px] flex-col items-center gap-4">
    <input
      name="email"
      type="text"
      v-model="email"
      placeholder="E-mail"
      class="w-72 rounded border border-gray-300 p-2"
    />
    <input
      name="password"
      type="text"
      v-model="password"
      placeholder="Password"
      class="w-72 rounded border border-gray-300 p-2"
    />
    <button @click.prevent="$emit('login', email, password)">
      <PrimaryBtn class="w-fit"> Submit </PrimaryBtn>
    </button>
  </form>
</template>

<style scoped></style>
