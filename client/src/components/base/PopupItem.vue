<script setup lang="ts">
import usePopUps, { type PopUpType } from '@/store/popup.ts'
import { computed, onMounted, useTemplateRef } from 'vue'

const popUpStore = usePopUps()

const props = defineProps({
  popUpInfo: {
    type: Object as () => PopUpType,
    required: true,
  },
  duration: {
    type: Number,
    default: 3000,
    required: false,
  },
})

const componentDesign = computed(() => {
  switch (props.popUpInfo.severity) {
    case 'success':
      return ['bg-green-400', 'border-green-500']
    case 'error':
      return ['bg-red-400', 'border-red-500']
    case 'warning':
      return ['bg-yellow-400', 'border-yellow-500']
    default:
      return ['bg-gray-100', 'border-gray-200']
  }
})

const popUpBody = useTemplateRef('popUpBody')

onMounted(() => {
  if (popUpBody.value?.classList) {
    popUpBody.value.classList.replace('top-[-4rem]', 'top-4')
    popUpBody.value.classList.replace('transition-all', 'transition-all')
    popUpBody.value.classList.add('duration-1000', 'ease-in-out')
  }
  setTimeout(() => {
    popUpStore.removePopUp(props.popUpInfo)
  }, props.duration)
})
</script>

<template>
  <div ref="popUpBody" class="fixed top-3 z-50 flex w-full justify-center transition-all md:top-4">
    <div
      :class="
        [
          'max-w-sm',
          'grow',
          'py-1',
          'px-3',
          'mx-3',
          'block',
          'rounded-md',
          'border-2',
          'flex',
          'justify-between',
          'md:rounded',
        ].concat(componentDesign)
      "
    >
      <span class="mt-[-2px] text-2xl">{{ props.popUpInfo.message }}</span>
      <button class="mt-[-10px] cursor-pointer text-4xl" @click="popUpStore.removePopUp(popUpInfo)">
        &times;
      </button>
    </div>
  </div>
</template>
