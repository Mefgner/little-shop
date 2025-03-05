<script setup lang="ts">
import useCart from '@/store/cart.ts'
import CartItem from '@/components/modal/cart/parts/CartItem.vue'
import PrimaryBtn from '@/components/base/PrimaryBtn.vue'
import { useRouter } from 'vue-router'

const usedCart = useCart()
const router = useRouter()
const props = defineProps({
  doShowPurchase: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div v-if="usedCart.cart.length > 0" class="flex flex-col overflow-y-auto px-2 pb-8 md:px-8">
    <div v-if="usedCart.batchedCart.length > 0">
      <CartItem
        :count="count"
        :key="value.id"
        :product="value"
        v-for="{ value, count } of usedCart.batchedCart"
      />
    </div>
    <button class="mt-4 w-fit self-end" @click.prevent="router.push('/checkout')">
      <PrimaryBtn v-if="props.doShowPurchase"> Checkout</PrimaryBtn>
    </button>
  </div>
  <div v-else class="flex h-[40vh] flex-col items-center justify-center">
    <p class="mt-[-10px] text-xl">No items in useCart</p>
  </div>
</template>
