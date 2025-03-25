<script setup lang="ts">
import FormInput from '@/components/base/FormInput.vue'
import PrimaryBtn from '@/components/base/PrimaryBtn.vue'
import { ref } from 'vue'
import type { User } from '@/store/auth.ts'

const data = ref<User>({} as User)
</script>

<template>
  <div class="flex w-[660px] flex-col items-center gap-4">
    <form class="flex max-w-72 flex-col items-center gap-3">
      <FormInput v-model="data.name" type="text" placeholder="Full Name" required />
      <FormInput v-model="data.email" type="email" placeholder="Email" required />
      <FormInput v-model="data.password" type="password" placeholder="Password" required />

      <p class="mt-2 w-full">Not required fields down</p>
      <FormInput v-model="data.phone" type="tel" placeholder="Phone Number" />

      <div class="flex gap-2">
        <FormInput v-model="data.deliveryAddress" type="text" placeholder="Delevery Address" />
        <FormInput v-model="data.deliveryZipCode" type="text" placeholder="Postal Code" />
      </div>
      <div class="flex gap-2">
        <FormInput v-model="data.deliveryCity" type="text" placeholder="City" />
        <FormInput v-model="data.deliveryCountry" type="text" placeholder="Country" />
      </div>
      <button class="mt-4" @click.prevent="$emit('register', data)">
        <PrimaryBtn class="w-fit"> Register </PrimaryBtn>
      </button>
    </form>
  </div>
</template>

<style scoped></style>
