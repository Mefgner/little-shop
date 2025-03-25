<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import ModalBase from '@/components/modal/ModalBase.vue'
import ModalCart from '@/components/modal/cart/ModalCart.vue'
import ModalUser from '@/components/modal/user/ModalUser.vue'

import { ref } from 'vue'
const showPersonal = ref(false)
const showCart = ref(false)
</script>

<template>
  <div>
    <NavBar @showPersonal="() => (showPersonal = true)" @showCart="() => (showCart = true)" />
    <ModalBase name="Personal" :key="'personal'" v-if="showPersonal" @close="showPersonal = false">
      <ModalUser />
    </ModalBase>
    <ModalBase name="Cart" :key="'cart'" v-if="showCart" @close="showCart = false">
      <ModalCart />
    </ModalBase>
  </div>
</template>
