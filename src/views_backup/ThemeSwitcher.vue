<template>
  <div
      class="min-h-screen transition-colors duration-300"
      :style="{
      backgroundColor: theme.bgPrimary,
      color: theme.textPrimary
    }"
  >
    <!-- Navbar -->
    <nav
        class="sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300"
        :style="{
        backgroundColor: theme.bgSecondary + 'ee',
        borderColor: theme.borderColor
      }"
    >
      <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <span class="text-xl font-bold">ThemeCraft</span>
        <div class="flex gap-2">
          <button
              v-for="t in themes"
              :key="t.name"
              @click="currentTheme = t.name"
              class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
              :style="{
              backgroundColor: t.preview,
              borderColor: currentTheme === t.name ? theme.textPrimary : 'transparent'
            }"
              :title="t.name"
          />
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <section class="py-24 px-6 text-center">
      <h1 class="text-5xl font-bold mb-6">Build Beautiful Interfaces</h1>
      <p class="text-xl mb-8 max-w-2xl mx-auto" :style="{ color: theme.textSecondary }">
        A Vue 3 landing page with seamless theme switching. Click the circles above to change themes.
      </p>
      <div class="flex gap-4 justify-center">
        <button
            class="px-6 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
            :style="{ backgroundColor: theme.accent, color: theme.bgPrimary }"
        >
          Get Started
        </button>
        <button
            class="px-6 py-3 rounded-lg font-semibold border-2 transition-transform hover:scale-105"
            :style="{ borderColor: theme.borderColor }"
        >
          Learn More
        </button>
      </div>
    </section>

    <!-- Features -->
    <section class="py-16 px-6">
      <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div
            v-for="feature in features"
            :key="feature.title"
            class="p-6 rounded-xl border transition-transform hover:-translate-y-1"
            :style="{
            backgroundColor: theme.bgCard,
            borderColor: theme.borderColor
          }"
        >
          <div
              class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl"
              :style="{ backgroundColor: theme.accent + '20', color: theme.accent }"
          >
            {{ feature.icon }}
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p :style="{ color: theme.textSecondary }">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section
        class="py-12 px-6 border-y"
        :style="{
        backgroundColor: theme.bgSecondary,
        borderColor: theme.borderColor
      }"
    >
      <div class="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <div class="text-3xl font-bold" :style="{ color: theme.accent }">{{ stat.value }}</div>
          <div :style="{ color: theme.textMuted }">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 px-6 text-center" :style="{ color: theme.textMuted }">
      <p>Built with Vue 3 + Tailwind CSS</p>
      <p class="text-sm mt-2">Current theme: {{ currentTheme }}</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const themes = [
  { name: 'light', preview: '#ffffff' },
  { name: 'dark', preview: '#1a1a2e' },
  { name: 'ocean', preview: '#0c4a6e' }
]

const themeColors = {
  light: {
    bgPrimary: '#ffffff',
    bgSecondary: '#f8fafc',
    bgCard: '#ffffff',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
    borderColor: '#e2e8f0',
    accent: '#3b82f6'
  },
  dark: {
    bgPrimary: '#0f0f1a',
    bgSecondary: '#1a1a2e',
    bgCard: '#252542',
    textPrimary: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textMuted: '#64748b',
    borderColor: '#334155',
    accent: '#8b5cf6'
  },
}

const currentTheme = ref('light')
const theme = computed(() => themeColors[currentTheme.value])

const features = [
  { icon: '🎨', title: 'Theme Switching', description: 'Seamless transitions between multiple color themes.' },
  { icon: '⚡', title: 'Vue 3 Powered', description: 'Built with Composition API and reactive state.' },
  { icon: '📱', title: 'Fully Responsive', description: 'Looks great on all devices and screen sizes.' }
]

const stats = [
  { value: '10K+', label: 'Users' },
  { value: '99%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
  { value: '50+', label: 'Themes' }
]
</script>