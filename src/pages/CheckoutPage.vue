<script lang="ts" setup>
import FooterComponent from '@/components/FooterComponent.vue'
import ModalCart from '@/components/modal/cart/ModalCart.vue'
import ModalNav from '@/components/ModalNav.vue'
import PrimaryBtn from '@/components/base/PrimaryBtn.vue'
import PrettyInput from '@/components/base/PrettyInput.vue'
import { onMounted, reactive, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import useCart from '@/store/cart'
import useAuth, { type User } from '@/store/auth'
import useOrder from '@/store/order'
import type { Order } from '@/api/order.ts'

const router = useRouter()

const authStore = useAuth()
const cartStore = useCart()
const orderStore = useOrder()

const isCartEmpty = ref(cartStore.cart.length === 0)

const user = ref<User | null | void>()
const orderInfo = reactive<Order>({} as Order)

const purchase = ref<boolean>(false)

authStore.$subscribe((mutation, state) => {
  if (mutation.type === 'direct' && mutation.storeId === 'auth') {
    user.value = state.user
  }
})

cartStore.$subscribe((mutation, state) => {
  if (mutation.type === 'direct' && mutation.storeId === 'cart') {
    isCartEmpty.value = state.cart.length === 0
  }
})

function createOrder() {
  orderInfo.products = toRaw(cartStore.batchedCart)

  if (!user.value) {
    throw new Error('User is not logged in')
  }

  orderInfo.userId = user.value.id
  orderStore.placeOrder(orderInfo).then((v) => {
    window.location.assign(v.data)
  })
}

onMounted(async () => {
  if (router.currentRoute.value.query['success']) {
    purchase.value = true
    cartStore.clearCart()
    return
  }

  if (authStore.user) {
    user.value = authStore.user
  }
  await authStore.getUserData()

  orderInfo.receiverEmail = user.value?.email || ''
  orderInfo.receiverName = user.value?.name || ''
  orderInfo.phone = user.value?.phone || ''
  orderInfo.deliveryAddress = user.value?.deliveryAddress || ''
  orderInfo.deliveryCity = user.value?.deliveryCity || ''
  orderInfo.deliveryCountry = user.value?.deliveryCountry || ''
  orderInfo.deliveryZipCode = user.value?.deliveryZipCode || ''
})
</script>

<template>
  <ModalNav />
  <div v-if="!purchase" class="relative mx-auto flex w-fit flex-1 flex-col lg:flex-row">
    <div>
      <ModalCart :do-show-purchase="false" class="pt-8" />
    </div>
    <form v-if="!isCartEmpty">
      <div class="sticky flex flex-col items-center justify-center lg:pt-10 lg:pl-8">
        <h1 class="text-2xl font-bold">Checkout</h1>
        <form class="flex flex-col items-center justify-center">
          <PrettyInput v-model="orderInfo.receiverName" placeholder="Full Name" type="text" />
          <PrettyInput v-model="orderInfo.receiverEmail" placeholder="Email" type="email" />
          <PrettyInput v-model="orderInfo.phone" placeholder="Mobile Phone" type="tel" />
          <PrettyInput v-model="orderInfo.deliveryAddress" placeholder="Address" type="text" />
          <PrettyInput v-model="orderInfo.deliveryCity" placeholder="City" type="text" />
          <PrettyInput v-model="orderInfo.deliveryCountry" placeholder="Country" type="text" />
          <PrettyInput v-model="orderInfo.deliveryZipCode" placeholder="Zip" type="text" />
          <div class="mt-4 flex w-full items-center justify-between">
            <span class="text-lg font-bold"> ${{ cartStore.cartTotal }} </span>
            <button @click.prevent="createOrder" class="w-fit">
              <PrimaryBtn>Purchase</PrimaryBtn>
            </button>
          </div>
        </form>
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
