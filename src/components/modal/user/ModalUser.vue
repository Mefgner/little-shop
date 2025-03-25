<script setup lang="ts">
import createAuth, { type User } from '@/store/auth.ts'
import { onMounted, ref } from 'vue'
import PrimaryBtn from '@/components/base/PrimaryBtn.vue'
import UserInfo from '@/components/modal/user/parts/UserInfo.vue'
import UserLogin from '@/components/modal/user/parts/UserLogin.vue'
import UserRegister from '@/components/modal/user/parts/UserRegister.vue'

const authStore = createAuth()
const userInfo = ref<User | null | void>()
authStore.$subscribe((mutation, state) => {
  if (mutation.type === 'direct' && mutation.storeId === 'auth') {
    userInfo.value = state.user
  }
})

const loginStage = ref(false)
const registerStage = ref(false)

const changesHandler = <T,>(fn: () => Promise<T>) => {
  fn().then(() => authStore.getUserData())
}

const onLogin = (email: string, password: string) => {
  changesHandler(() => authStore.login(email, password).then(() => (loginStage.value = false)))
}

const onRegister = (userData: User) => {
  changesHandler(() => authStore.register(userData).then(() => (registerStage.value = false)))
}

const onLogout = () => authStore.logout()

onMounted(() => {
  if (authStore.user) {
    userInfo.value = authStore.user
  }
  authStore.getUserData()
})
</script>

<template>
  <div class="flex h-full min-w-[440px] flex-col items-center justify-center align-middle">
    <UserInfo v-if="userInfo" :user="userInfo" @logout="onLogout" />
    <div
      v-else-if="!userInfo && !loginStage && !registerStage"
      class="flex items-center justify-center gap-3"
    >
      <button class="w-fit" @click="loginStage = true">
        <PrimaryBtn>Login</PrimaryBtn>
      </button>
      <button class="w-fit" @click="registerStage = true">
        <PrimaryBtn>Register</PrimaryBtn>
      </button>
    </div>
    <UserLogin v-else-if="loginStage" @login="onLogin" />
    <UserRegister v-else-if="registerStage" @register="onRegister" />
  </div>
</template>

<style scoped></style>
