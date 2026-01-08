<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="onCancel"
      >
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
          <!-- Icon -->
          <div class="flex items-center justify-center mb-4">
            <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </div>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-bold text-gray-900 text-center mb-2">
            {{ title }}
          </h3>

          <!-- Message -->
          <p class="text-sm text-gray-600 text-center mb-6">
            {{ message }}
          </p>

          <!-- Actions -->
          <div class="flex gap-3">
            <button
              @click="onCancel"
              class="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              @click="onConfirm"
              class="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Confirm Action',
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?',
  },
})

const emit = defineEmits(['confirm', 'cancel'])

const onConfirm = () => {
  emit('confirm')
}

const onCancel = () => {
  emit('cancel')
}
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

.modal-fade-enter-active .bg-white,
.modal-fade-leave-active .bg-white {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-fade-enter-from .bg-white {
  transform: scale(0.95);
  opacity: 0;
}

.modal-fade-leave-to .bg-white {
  transform: scale(0.95);
  opacity: 0;
}
</style>
