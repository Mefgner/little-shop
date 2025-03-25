<template>
  <div class="flex min-h-[100vh] flex-col dark:bg-gray-900 dark:text-gray-300">
    <PopupView />
    <router-view />
  </div>
</template>
<script setup lang="ts">
import PopupView from '@/components/PopupView.vue'
</script>
