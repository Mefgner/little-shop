<script setup lang="ts">
import type { User } from '@/store/auth'
import PrimaryBtn from '@/components/base/PrimaryBtn.vue'
const props = defineProps({
  user: {
    required: true,
    type: Object as () => User,
  },
})
</script>

<template>
  <div class="h-full w-[440px] p-8">
    <div class="flex gap-1.5">
      <h3 class="text-2xl font-semibold">{{ user.name }}</h3>
      <h3 class="mt-[-0.5rem] text-xl">({{ user.privileges }})</h3>
    </div>
    <p class="text-gray-500">{{ user.email }}</p>
    <p class="text-gray-500" v-if="user.phone">{{ user.phone }}</p>
    <h5 class="mt-5 text-xl" v-if="user.deliveryAddress">Delivery Address:</h5>
    <p>{{ user.deliveryAddress }}</p>
    <p>{{ user.deliveryCity }}</p>
    <p>{{ user.deliveryZipCode }}</p>
    <p>{{ user.deliveryCountry }}</p>
    <button class="relative right-0 bottom-0 mt-5 block" @click.prevent="$emit('logout')">
      <PrimaryBtn>Logout</PrimaryBtn>
    </button>
  </div>
</template>
