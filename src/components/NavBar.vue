<script setup lang="ts">
import MainLogo from '@/components/nav/MainLogo.vue'
import SearchBar from '@/components/nav/SearchBar.vue'
import SquareBtn from '@/components/base/SquareBtn.vue'
</script>

<template>
  <nav
    class="flex flex-wrap items-center justify-between gap-1.5 border-b-2 border-gray-100 px-7 py-3 *:flex-auto dark:border-gray-800"
  >
    <router-link to="/">
      <MainLogo class="order-1" />
    </router-link>
    <SearchBar class="order-3 mt-2 sm:order-2 md:mt-0" />
    <div class="order-2 flex justify-end gap-3 sm:order-3 sm:px-2.5">
      <SquareBtn @click="$emit('showPersonal')">
        <img src="@/assets/imgs/icons8-person-30.png" class="dark:invert" alt="Personal" />
      </SquareBtn>
      <SquareBtn @click="$emit('showCart')">
        <img src="@/assets/imgs/icons8-cart-30.png" class="dark:invert" alt="Cart" />
      </SquareBtn>
    </div>
  </nav>
</template>
