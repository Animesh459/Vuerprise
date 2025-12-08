<!--<template>-->
<!--  <div class="relative" ref="dropdownRef">-->
<!--    <button-->
<!--        @click="isOpen = !isOpen"-->
<!--        class="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full pl-2 pr-3 py-1.5 transition-all duration-200 border border-transparent hover:border-slate-600"-->
<!--    >-->
<!--      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 ring-2 ring-white/10"></div>-->
<!--      <span class="text-sm text-white font-medium">Mello</span>-->
<!--      <svg-->
<!--          class="w-4 h-4 text-slate-400 transition-transform duration-300"-->
<!--          :class="{ 'rotate-180': isOpen }"-->
<!--          fill="none"-->
<!--          stroke="currentColor"-->
<!--          viewBox="0 0 24 24"-->
<!--      >-->
<!--        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />-->
<!--      </svg>-->
<!--    </button>-->

<!--    <Transition-->
<!--        enter-active-class="transition duration-200 ease-out"-->
<!--        enter-from-class="opacity-0 scale-95 -translate-y-2"-->
<!--        enter-to-class="opacity-100 scale-100 translate-y-0"-->
<!--        leave-active-class="transition duration-150 ease-in"-->
<!--        leave-from-class="opacity-100 scale-100 translate-y-0"-->
<!--        leave-to-class="opacity-0 scale-95 -translate-y-2"-->
<!--    >-->
<!--      <div-->
<!--          v-if="isOpen"-->
<!--          class="absolute top-full right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-black/50 py-2 z-50 border border-slate-700/50 overflow-hidden"-->
<!--      >-->
<!--        <div class="px-4 py-3 border-b border-slate-700/50">-->
<!--          <p class="text-sm text-white font-medium">Mello</p>-->
<!--          <p class="text-xs text-slate-400">mello@example.com</p>-->
<!--        </div>-->

<!--        <div class="py-1">-->
<!--          <a-->
<!--              v-for="item in menuItems"-->
<!--              :key="item.label"-->
<!--              href="#"-->
<!--              class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150 group"-->
<!--          >-->
<!--            <component :is="item.icon" class="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />-->
<!--            {{ item.label }}-->
<!--          </a>-->
<!--        </div>-->

<!--        <div class="border-t border-slate-700/50 pt-1 mt-1">-->
<!--          <a-->
<!--              href="#"-->
<!--              class="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-150 group"-->
<!--          >-->
<!--            <LogOut class="w-4 h-4" />-->
<!--            Logout-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->
<!--    </Transition>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, onMounted, onUnmounted, h } from 'vue'-->
<!--import { User, Settings, LogOut } from 'lucide-vue-next'-->

<!--const isOpen = ref(false)-->
<!--const dropdownRef = ref(null)-->

<!--const menuItems = [-->
<!--  { label: 'Profile', icon: User },-->
<!--  { label: 'Settings', icon: Settings },-->
<!--]-->

<!--const handleClickOutside = (e) => {-->
<!--  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {-->
<!--    isOpen.value = false-->
<!--  }-->
<!--}-->

<!--onMounted(() => document.addEventListener('click', handleClickOutside))-->
<!--onUnmounted(() => document.removeEventListener('click', handleClickOutside))-->
<!--</script>-->




<template>
  <div class="relative" ref="dropdownRef">
    <div @click="isOpen = !isOpen" class="cursor-pointer">
      <slot name="trigger"></slot>
    </div>

    <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95 -translate-y-2"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 -translate-y-2"
    >
      <div
          v-if="isOpen"
          class="absolute top-full right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-black/50 py-2 z-50 border border-slate-700/50 overflow-hidden"
          :class="[contentClasses]"
      >
        <slot name="content"></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Define props to allow overriding the dropdown's content class (e.g., width, position)
defineProps({
  contentClasses: {
    type: String,
    default: '',
  },
})

const isOpen = ref(false)
const dropdownRef = ref(null)

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

// Expose 'close' method for external control if needed
const close = () => {
  isOpen.value = false
}

defineExpose({ close, isOpen })
</script>
