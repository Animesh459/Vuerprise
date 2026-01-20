<template>
  <Transition name="modal-fade">
    <div v-if="isVisible"
         @click.self="$emit('close')"
         class="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
         style="background-color: rgba(0, 0, 0, 0.7);"
    >
      <Transition name="modal-slide">
        <div v-if="isVisible"
             :class="['bg-white rounded-xl shadow-2xl w-full transform transition-all border border-gray-200', sizeClass, scrollClass]"
             role="dialog"
             aria-modal="true"
        >
          <header v-if="title || $slots.header" class="flex justify-between items-center p-6 border-b border-gray-200">
            <slot name="header">
              <h3 class="text-xl font-bold text-gray-900">
                {{ title }}
              </h3>
            </slot>
            <button @click="$emit('close')"
                    class="text-gray-700 hover:text-red-500 transition duration-150"
                    aria-label="Close modal"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </header>

          <section :class="['text-gray-700', contentClass]">
            <slot></slot>
          </section>

          <footer v-if="$slots.footer" class="flex gap-3 p-6 border-t border-gray-200">
            <slot name="footer"></slot>
          </footer>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, defineEmits, watch, computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'auto'].includes(value)
  },
  scrollable: {
    type: Boolean,
    default: false
  },
  maxHeight: {
    type: String,
    default: '' // e.g., '80vh'
  },
  contentClass: {
    type: String,
    default: 'p-6'
  }
});

const emit = defineEmits(['close']);

// Support both isOpen and show props
const isVisible = computed(() => props.isOpen || props.show);

// Size class mapping
const sizeClass = computed(() => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    auto: 'max-w-[95vw]'
  };
  return sizes[props.size] || sizes.md;
});

// Scroll and max-height classes
const scrollClass = computed(() => {
  if (props.scrollable || props.maxHeight) {
    return 'overflow-hidden flex flex-col max-h-[90vh]';
  }
  return '';
});

// ESC key listener for accessibility and convenience
const handleEscape = (e) => {
  if (e.key === 'Escape' && isVisible.value) {
    emit('close');
  }
};

watch(isVisible, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
  } else {
    document.removeEventListener('keydown', handleEscape);
    document.body.style.overflow = '';
  }
}, { immediate: true });
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-slide-enter-from,
.modal-slide-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>
