<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import ModalBase from '@/components/base/ModalBase.vue'
import ModalCart from '@/components/modal/cart/ModalCart.vue'
import ModalUser from '@/components/modal/user/ModalUser.vue'

import { ref } from 'vue'
import createAuth from '@/store/auth.ts'

const showPersonal = ref(false)
const showCart = ref(false)
const showSettings = ref(false)

const userStore = createAuth()
</script>

<template>
  <div>
    <NavBar
      @showPersonal="() => (showPersonal = true)"
      @showCart="() => (showCart = true)"
      @showSettings="() => (showSettings = true)"
    />
    <ModalBase name="Personal" :key="'personal'" v-if="showPersonal" @close="showPersonal = false">
      <ModalUser />
    </ModalBase>
    <ModalBase name="Cart" :key="'useCart'" v-if="showCart" @close="showCart = false">
      <ModalCart />
    </ModalBase>
    <ModalBase name="Settings" :key="'settings'" v-if="showSettings" @close="showSettings = false">
      Maybe later or not at all
    </ModalBase>
  </div>
</template>
