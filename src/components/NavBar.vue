<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Moon } from 'lucide-vue-next'
import { Sun } from 'lucide-vue-next'

const isDarkMode: Ref<boolean> = ref(false)

const applyTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  applyTheme()
}

onMounted(() => {
  const theme = localStorage.getItem('theme')
  isDarkMode.value =
    theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)

  applyTheme()
})
</script>

<template>
  <nav class="flex items-center justify-between">
    <RouterLink to="/" class="text-2xl font-semibold"> Jason Morales </RouterLink>
    <div class="flex justify-between items-center dark:bg-gray-700">
      <a href="#" class="mx-4 text-lg font-medium"> Home </a>
      <a href="#about" class="mx-4 text-lg font-medium"> About </a>
      <a href="#projects" class="mx-4 text-lg font-medium"> Projects </a>

      <Switch id="themeSwitch" :model-value="isDarkMode" @update:model-value="toggleTheme" />
      <Label for="themeSwitch" class="">
        <Button id="themeButton" variant="ghost" size="icon" @click="toggleTheme">
          <button v-if="isDarkMode">
            <Sun class="h-5 w-5" />
          </button>
          <template v-else>
            <Moon class="h-5 w-5" />
          </template>
        </Button>
      </Label>
    </div>
  </nav>
</template>
