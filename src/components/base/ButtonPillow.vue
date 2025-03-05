<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps({
  buttons: {
    type: Array<{ text: string; func: () => void }>,
    required: true,
  },
  radioAlike: {
    type: Boolean,
    default: false,
    required: false,
  },
})

const activeBtnId = ref<number | undefined>(undefined)

const selectButton = function (index: number, func: () => void) {
  activeBtnId.value = props.radioAlike ? index : undefined
  func()
}
</script>

<template>
  <div
    class="border-gray flex rounded border-2 border-gray-300 transition *:block *:min-h-9 *:min-w-9 *:px-2 *:text-center *:font-bold hover:shadow-md dark:border-gray-700"
  >
    <button
      :class="[
        'cursor-pointer overflow-hidden border-r-2 border-gray-200 transition last:border-r-0 hover:bg-gray-300 hover:text-gray-900 dark:border-gray-700',
        activeBtnId === index ? 'bg-gray-300 text-gray-900' : 'bg-white text-gray-700',
      ]"
      :key="button.text"
      v-for="(button, index) in props.buttons"
      @click="selectButton(index, button.func)"
    >
      <div class="mt-[-2px]">{{ button.text }}</div>
    </button>
  </div>
</template>
