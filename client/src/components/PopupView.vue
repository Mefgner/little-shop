<script setup lang="ts">
import PopupItem from '@/components/base/PopupItem.vue'
import usePopUps from '@/store/popup.ts'
import { computed } from 'vue'

const popUpStore = usePopUps()
const currentPopUp = computed(() => popUpStore.popUpStack[0])
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 transform"
    enter-from-class="opacity-0 -translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-400 transform"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-4"
  >
    <PopupItem
      v-if="currentPopUp"
      :key="currentPopUp.origin + ':' + currentPopUp.message"
      :pop-up-info="currentPopUp"
    />
  </Transition>
</template>

<style scoped></style>
