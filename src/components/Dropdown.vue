
<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'

const props = defineProps({
  contentClasses: {
    type: String,
    default: '',
  },
  isSubmenu: {
    type: Boolean,
    default: false,
  },
  alignSubmenuToParentTop: {
    type: Boolean,
    default: false,
  },
})

const isOpen = ref(false)
const dropdownRef = ref(null) // Root element of Dropdown component
const triggerRef = ref(null) // Reference to the trigger slot wrapper
const dropdownContentRef = ref(null) // Reference to the actual dropdown panel

const submenuTopOffset = ref(0)

const calculateSubmenuOffset = async () => {
  if (!props.isSubmenu || !props.alignSubmenuToParentTop || !dropdownRef.value || !triggerRef.value) {
    submenuTopOffset.value = 0
    return
  }

  await nextTick() // Ensure DOM is updated after opening


  let parentDropdownContent = null;
  let currentElement = dropdownRef.value.parentElement;

  while(currentElement) {
    // If it's a dropdown content div (e.g., from a parent Dropdown component's #content slot)
    // This is a heuristic. A more robust solution might require a specific class on parent dropdown contents.
    if (currentElement.classList.contains('py-1') || currentElement.classList.contains('dropdown-content-panel')) {
      parentDropdownContent = currentElement;
      break;
    }
    currentElement = currentElement.parentElement;
  }

  if (parentDropdownContent && dropdownContentRef.value) {
    const triggerRect = triggerRef.value.getBoundingClientRect();
    const parentContentRect = parentDropdownContent.getBoundingClientRect();

    // Calculate how far the trigger is from the top of the parent dropdown's content panel
    // And then negate that to align the submenu panel's top with the parent's top
    submenuTopOffset.value = parentContentRect.top - triggerRect.top;
  } else {
    // Fallback if parent not found, or not aligned to parent top
    submenuTopOffset.value = 0;
  }
}

// Watch isOpen to recalculate when it opens
watch(isOpen, (newVal) => {
  if (newVal) {
    calculateSubmenuOffset();
  }
})

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

const submenuDynamicStyles = computed(() => {
  if (props.isSubmenu && props.alignSubmenuToParentTop) {
    return {
      top: `${submenuTopOffset.value}px`,
      left: '100%',
      marginLeft: '0rem', // ml-1
    };
  }
  return {};
});

defineExpose({ close, isOpen })
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <div @click="isOpen = !isOpen" class="cursor-pointer" ref="triggerRef">
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
              // If alignSubmenuToParentTop is true, dynamic styles from submenuDynamicStyles are used
              isSubmenu && !alignSubmenuToParentTop
                  ? 'top-0 left-full ml-1'
                  : !isSubmenu
                      ? 'top-full right-0' : '', // Fallback to empty if submenu and not aligning to parent top
              contentClasses
          ]"
          :style="submenuDynamicStyles"
          ref="dropdownContentRef"
      >
        <slot name="content"></slot>
      </div>
    </Transition>
  </div>
</template>
