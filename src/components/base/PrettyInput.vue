<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <input
    :type="props.type"
    :placeholder="props.placeholder"
    class="mt-4 h-10 w-72 rounded-md border border-gray-300 p-2"
  />
</template>

<style scoped></style>
