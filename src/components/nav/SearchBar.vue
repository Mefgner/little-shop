<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, unref } from 'vue'

const router = useRouter()
const val = ref<string>()

function search() {
  router.push({ path: '/', query: { query: unref(val.value) } }).then(() => (val.value = ''))
}
</script>

<template>
  <form
    class="flex items-center justify-between overflow-hidden rounded-md border-2 border-gray-200 *:py-0.5 dark:border-gray-700"
  >
    <div class="flex-auto border-r-2 border-gray-200 px-1 pl-2 dark:border-gray-700">
      <input
        v-model="val"
        type="text"
        name="search-text"
        placeholder="Search something..."
        class="block h-10 w-full border-none text-xl outline-none sm:h-8 sm:text-lg dark:bg-gray-900"
      />
    </div>
    <div class="flex size-11 items-center justify-center p-0.5 sm:size-9">
      <button class="cursor-pointer" @keyup.enter.prevent="search" @click.prevent="search">
        <img src="@/assets/imgs/favicon.ico" alt="#" />
      </button>
    </div>
  </form>
</template>
