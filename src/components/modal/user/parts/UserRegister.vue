<script setup lang="ts">
import PrettyInput from '@/components/base/PrettyInput.vue'
import PrimaryBtn from '@/components/base/PrimaryBtn.vue'
import { ref } from 'vue'
import type { User } from '@/store/auth.ts'

const data = ref<User>({} as User)
</script>

<template>
  <div class="flex w-[660px] flex-col items-center gap-4">
    <form class="flex max-w-72 flex-col items-center gap-3">
      <PrettyInput v-model="data.name" type="text" placeholder="Full Name" required />
      <PrettyInput v-model="data.email" type="email" placeholder="Email" required />
      <PrettyInput v-model="data.password" type="password" placeholder="Password" required />

      <p class="mt-2 w-full">Not required fields down</p>
      <PrettyInput v-model="data.phone" type="tel" placeholder="Phone Number" />

      <div class="flex gap-2">
        <PrettyInput v-model="data.deliveryAddress" type="text" placeholder="Delevery Address" />
        <PrettyInput v-model="data.deliveryZipCode" type="text" placeholder="Postal Code" />
      </div>
      <div class="flex gap-2">
        <PrettyInput v-model="data.deliveryCity" type="text" placeholder="City" />
        <PrettyInput v-model="data.deliveryCountry" type="text" placeholder="Country" />
      </div>
      <button class="mt-4" @click.prevent="$emit('register', data)">
        <PrimaryBtn class="w-fit"> Register </PrimaryBtn>
      </button>
    </form>
  </div>
</template>

<style scoped></style>
