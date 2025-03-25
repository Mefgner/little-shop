<script setup lang="ts">
import ModalNav from '@/components/ModalNav.vue'
import ButtonPillow from '@/components/base/ButtonPillow.vue'
import CardBase from '@/components/base/CardBase.vue'
import FooterComponent from '@/components/FooterComponent.vue'

import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import useProducts from '@/store/products.ts'
import type { Product } from '@/api/product.ts'

const router = useRouter()
const usedProducts = useProducts()
const products = ref<Product[]>([] as Product[])

const currentSort = ref<'priceAsc' | 'priceDesc' | 'newest'>('newest')
const sortButtons = ref([
  { text: '↗ Price', func: () => (currentSort.value = 'priceAsc') },
  { text: '↘ Price', func: () => (currentSort.value = 'priceDesc') },
  { text: 'Newest', func: () => (currentSort.value = 'newest') },
])

async function getProducts(query: string) {
  products.value = await usedProducts.getSimplifiedProducts(query || '')
}

onMounted(() => {
  const query = router.currentRoute.value.query.query as string
  getProducts(query)
})

watch(
  () => router.currentRoute.value.query.query,
  (query) => getProducts(query as string),
)

const sortedItems = computed(() => {
  if (!Array.isArray(products.value)) {
    console.log(products.value)
    return []
  }
  const sorted = [...products.value]
  switch (currentSort.value) {
    case 'priceAsc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'priceDesc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id)
    default:
      return sorted
  }
})
</script>

<template>
  <ModalNav />
  <main class="grow px-9">
    <div class="container mx-auto py-6">
      <div class="flex flex-wrap justify-center *:m-2">
        <ButtonPillow :buttons="sortButtons" :radio-alike="true" :defaultIndex="2" />
      </div>
    </div>
    <div class="mx-auto grid w-fit grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
      <CardBase
        v-for="item in sortedItems"
        :key="item.id"
        :name="item.shortNaming"
        :img="usedProducts.getFullImgLink(item)"
        :price="'$' + item.price"
        :handler="() => router.push('/product?id=' + item.id)"
      />
    </div>
  </main>
  <FooterComponent />
</template>
