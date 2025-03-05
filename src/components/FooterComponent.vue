<script setup lang="ts">
import PrettyLink from '@/components/base/PrettyLink.vue'
</script>

<template>
  <footer class="mt-5 border-t-2 border-gray-100 py-14 dark:border-gray-800">
    <div class="mx-auto w-fit">
      <div class="flex flex-wrap justify-between gap-8 px-14 sm:px-0">
        <PrettyLink
          :key="index + 1333"
          v-for="(name, index) in ['About', 'Privacy Policy', 'Terms of Service', 'Contacts']"
        >
          {{ name }}
        </PrettyLink>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
