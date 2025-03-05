<script setup lang="ts">
import createAuth, { type User } from '@/store/auth.ts'
import { onMounted, ref } from 'vue'
import PrimaryBtn from '@/components/base/PrimaryBtn.vue'
import UserInfo from '@/components/modal/user/parts/UserInfo.vue'

const authStore = createAuth()
const userInfo = ref<User | null | void>(null)
const loginStage = ref(false)
const registerStage = ref(false)

const getData = () => {
  try {
    authStore.getUserData().then((response) => {
      userInfo.value = response
    })
  } catch (error) {
    console.info(error)
  }
}

const ChangesHandler = (fn: () => void) => {
  fn()
  getData()
}

const email = ref('')
const password = ref('')

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center align-middle">
    <UserInfo
      :user="userInfo"
      v-if="userInfo"
      @logout="
        () => {
          authStore.logout()
          userInfo = null
        }
      "
    />
    <div
      v-else-if="!userInfo && !loginStage && !registerStage"
      class="flex items-center justify-center gap-3"
    >
      <button class="w-fit" @click="ChangesHandler(() => (loginStage = true))">
        <PrimaryBtn> Login </PrimaryBtn>
      </button>
      <button class="w-fit" @click="registerStage = true">
        <PrimaryBtn> Register </PrimaryBtn>
      </button>
    </div>
    <div v-else-if="loginStage">
      <form class="flex flex-col items-center gap-4">
        <input
          type="text"
          v-model="email"
          placeholder="E-mail"
          class="w-64 rounded border border-gray-300 p-2"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="w-64 rounded border border-gray-300 p-2"
        />
        <button @click.prevent.stop="ChangesHandler(() => authStore.login(email, password))">
          <PrimaryBtn class="w-fit"> Submit </PrimaryBtn>
        </button>
      </form>
    </div>
    <div v-else-if="registerStage"></div>
  </div>
</template>

<style scoped></style>
