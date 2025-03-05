<script lang="ts" setup>
import FooterComponent from '@/components/FooterComponent.vue'
import ModalCart from '@/components/modal/cart/ModalCart.vue'
import ModalNav from '@/components/ModalNav.vue'
import PrimaryBtn from '@/components/base/PrimaryBtn.vue'
import PrettyInput from '@/components/base/PrettyInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useCart from '@/store/cart.ts'

const router = useRouter()
const usedCart = useCart()

const purchase = ref<boolean>(false)
</script>

<template>
  <ModalNav />
  <div v-if="!purchase" class="relative mx-auto flex w-fit flex-1 flex-col lg:flex-row">
    <div>
      <ModalCart :do-show-purchase="false" class="pt-8" />
    </div>
    <form>
      <div class="sticky flex flex-col items-center justify-center lg:pt-10 lg:pl-8">
        <h1 class="text-2xl font-bold">Checkout</h1>
        <div class="flex flex-col items-center justify-center">
          <PrettyInput placeholder="Full Name" type="text" />
          <PrettyInput placeholder="Email" type="email" />
          <PrettyInput placeholder="Address" type="text" />
          <PrettyInput placeholder="City" type="text" />
          <PrettyInput placeholder="Country" type="text" />
          <PrettyInput placeholder="Zip" type="text" />
          <div class="mt-4 flex w-full items-center justify-between">
            <span class="text-lg font-bold"> ${{ usedCart.cartTotal }} </span>
            <button
              @click.prevent="
                () => {
                  usedCart.clearCart()
                  purchase = true
                }
              "
            >
              <PrimaryBtn>Purchase</PrimaryBtn>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div v-else class="flex flex-1 flex-col items-center justify-center gap-3">
    <p class="text-2xl">Thank you for your purchase!</p>
    <button @click="router.push('/')">
      <PrimaryBtn>Back</PrimaryBtn>
    </button>
  </div>
  <FooterComponent />
</template>
