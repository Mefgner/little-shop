<script async setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue'
import ModalNav from '@/components/ModalNav.vue'
import PrimaryBtn from '@/components/base/PrimaryBtn.vue'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import useCart from '@/store/cart.ts'
import useProducts from '@/store/products.ts'
import type { FullProduct } from '@/api/product.ts'

const usedCart = useCart()
const route = useRoute()
const usedProduct = ref(useProducts())
const product = ref<FullProduct>({} as FullProduct)
onMounted(async () => {
  product.value = await usedProduct.value.getProduct(Number(route.query.id))
})
</script>

<template>
  <ModalNav />
  <div class="container mx-auto flex-auto">
    <article class="flex flex-col md:flex-row md:*:w-1/2">
      <div class="flex items-center p-6 md:p-14">
        <img
          :src="usedProduct.getFullImgLink(product)"
          alt="Item Image"
          class="m-auto block object-cover sm:max-h-96"
        />
      </div>
      <div class="flex flex-col justify-between p-6 md:p-14">
        <div>
          <h1 class="text-xl font-semibold">{{ product.naming }}</h1>
          <p class="my-7 block rounded-lg border-2 border-gray-300 p-3.5 dark:border-gray-700">
            {{ product.shortDescription }}
          </p>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <p class="text-lg font-semibold text-green-600 dark:text-green-400">In Stock</p>
            <p class="text-lg font-semibold text-green-600 dark:text-green-400">Free Shipping</p>
          </div>
          <div class="mt-5 flex items-center justify-between">
            <p class="text-2xl font-bold">${{ product.price }}</p>
            <button @click.prevent="usedCart.addToCart(usedProduct.simplifyProduct(product))">
              <PrimaryBtn>Add to Cart</PrimaryBtn>
            </button>
          </div>
        </div>
      </div>
    </article>
    <article
      class="mx-6 mt-4 border-t-2 border-gray-300 pt-4 text-lg md:mx-14 md:mt-8 md:pt-8 dark:border-gray-700"
    >
      {{ product.description }}
    </article>
    <div>
      <h1 class="px-6 py-7 text-3xl md:px-14 md:py-10">Specifications</h1>
    </div>
    <div class="grid grid-cols-2 gap-4 px-6 md:px-14">
      <div v-for="(value, key) in product.specifications" :key="key">
        <h2 class="text-xl font-semibold">{{ key }}</h2>
        <p class="text-lg">{{ value }}</p>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>
