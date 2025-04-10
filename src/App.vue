<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

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
  <header>
    <NavBar :isDarkMode="isDarkMode" @toggleTheme="toggleTheme" />
  </header>

  <RouterView />
</template>
