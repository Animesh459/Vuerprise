<template>
  <div class="theme-switcher">
    <button @click="toggleTheme" :aria-label="`Switch to next theme`">
      🎨 Toggle Theme
    </button>
    <select :value="currentTheme" @change="e => applyTheme(e.target.value)">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </div>
</template>

<script setup>
import { useTheme } from './useTheme.js';

const { currentTheme, applyTheme, toggleTheme } = useTheme();
</script>