<script setup lang="ts"></script>

<template>
  <div
    class="cursor-pointer rounded-md bg-green-700 px-5 py-3 text-xl text-white transition-shadow hover:shadow-md md:px-4 md:py-2 md:text-base dark:text-gray-200"
  >
    <div class="mt-[-2px]">
      <slot></slot>
    </div>
  </div>
</template>
