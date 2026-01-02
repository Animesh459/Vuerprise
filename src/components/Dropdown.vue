
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
          class="absolute mt-[20px] w-56 bg-white backdrop-blur-xl rounded-lg shadow-2xl shadow-black/50 py-2 z-50 border border-border"
          :class="[
              // Check for the 'is-submenu' prop to determine positioning
              isSubmenu
                  ? 'top-0 left-full ml-1'
                  : 'top-full right-0',
              contentClasses
          ]"
      >
        <slot name="content"></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  contentClasses: {
    type: String,
    default: '',
  },
  isSubmenu: {
    type: Boolean,
    default: false,
  }
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

const close = () => {
  isOpen.value = false
}

defineExpose({ close, isOpen })
</script>
