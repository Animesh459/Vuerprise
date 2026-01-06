<template>
  <Transition name="modal-fade">
    <div v-if="isOpen"
         @click.self="$emit('close')"
         class="fixed inset-0 bg-black/20 backdrop-blur-sm z-60 flex items-center justify-center p-4"
         style="background-color: rgba(0, 0, 0, 0.7);"
    >

      <Transition name="modal-slide">
        <div v-if="isOpen"
             class="bg-white rounded-xl shadow-2xl w-full max-w-lg
                 p-6 transform transition-all overflow-hidden border border-border"
             role="dialog"
             aria-modal="true"
        >
          <header class="flex justify-between items-center pb-4 border-b border-border">
            <h3 class="text-xl font-bold text-gray-700">
              {{ title }}
            </h3>
            <button @click="$emit('close')"
                    class="text-gray-700 hover:text-red-500 transition duration-150"
                    aria-label="Close modal"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </header>

          <section class="py-6 text-gray-700 space-y-4">
            <slot></slot>
          </section>

          <footer class="pt-4 border-t border-border text-right">
            <slot name="footer">
              <button @click="$emit('close')"
                      class="btn-secondary-new"
              >
                Close
              </button>
            </slot>
          </footer>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Modal Title'
  }
});

const emit = defineEmits(['close']);

// ESC key listener for accessibility and convenience
const handleEscape = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close');
  }
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', handleEscape);
  } else {
    document.removeEventListener('keydown', handleEscape);
  }
}, { immediate: true });
</script>

<style>



</style>