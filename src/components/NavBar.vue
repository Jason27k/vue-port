<script setup lang="ts">
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Moon } from 'lucide-vue-next'
import { Sun } from 'lucide-vue-next'

defineProps<{ isDarkMode: boolean }>()
const emit = defineEmits(['toggleTheme'])

const handleToggleTheme = () => {
  emit('toggleTheme')
}
</script>

<template>
  <nav class="flex items-center justify-between">
    <a href="#" class="text-2xl font-semibold" data-cy="name">Jason Morales</a>
    <div class="flex justify-between items-center">
      <a href="#" class="mx-4 text-lg font-medium">Home</a>
      <a href="#about" class="mx-4 text-lg font-medium">About</a>
      <a href="#projects" class="mx-4 text-lg font-medium">Projects</a>

      <Switch
        id="themeSwitch"
        data-cy="theme-switch"
        :model-value="isDarkMode"
        @update:model-value="handleToggleTheme"
      />
      <Label for="themeSwitch" class="" data-cy="theme-label">
        <Button data-cy="theme-button" variant="ghost" size="icon" @click="handleToggleTheme">
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
