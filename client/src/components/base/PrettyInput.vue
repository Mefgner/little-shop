<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (newVal) => {
    emit('update:modelValue', newVal)
  },
})
</script>

<template>
  <input
    v-model="internalValue"
    :type="props.type"
    :placeholder="props.placeholder"
    class="mt-4 h-10 w-72 rounded-md border border-gray-300 p-2"
  />
</template>
