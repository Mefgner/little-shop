<script setup lang="ts">
import SquareBtn from '@/components/base/SquareBtn.vue'

import type { Product } from '@/api/product.ts'
import useCart from '@/store/cart.ts'
import useProducts from '@/store/products.ts'

const usedProducts = useProducts()
const props = defineProps<{ product: Product; count: number }>()
const usedCart = useCart()
</script>

<template>
  <div
    class="mx-auto max-w-[550px] border-b-2 border-gray-300 last:border-b-0 dark:border-gray-800"
  >
    <div class="flex justify-between py-4">
      <div class="flex w-32 items-center sm:w-64">
        <img
          :src="usedProducts.getFullImgLink(props.product)"
          alt="Product Image"
          class="mx-auto max-h-24 object-cover sm:max-h-32"
        />
      </div>
      <div class="flex flex-1 py-3">
        <div class="flex flex-1 flex-col justify-between">
          <h3>{{ props.product.shortNaming }}</h3>
          <p class="text-bold float-end h-fit text-lg">
            ${{ props.product.price }} * {{ props.count }}x = ${{
              (props.product.price * props.count).toFixed(2)
            }}
          </p>
        </div>
        <button class="h-fit" @click.stop.prevent="usedCart.removeFromCart(props.product.id)">
          <SquareBtn class="text-red-500">
            <span class="mt-[-3px]">&times;</span>
          </SquareBtn>
        </button>
      </div>
    </div>
  </div>
</template>
