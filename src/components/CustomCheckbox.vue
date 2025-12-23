<template>
  <div class="flex items-center">
    <input
        :id="id"
        type="radio"
        :name="name"
        :checked="modelValue === id"
        @change="$emit('update:modelValue', id)"
        class="hidden"
    />

    <label
        :for="id"
        class="flex items-center cursor-pointer text-sm text-gray-300 select-none
             transition duration-200 ease-in-out group"
    >
      <div
          class="w-5 h-5 mr-3 rounded-md border flex items-center justify-center flex-shrink-0
               transition duration-300 ease-in-out"
          :class="modelValue === id
          ? 'border-cyan-600 bg-cyan-600 shadow-lg shadow-cyan-900/50'
          : 'border-slate-700 bg-slate-800 group-hover:border-cyan-500'"
      >
        <CheckIcon v-if="modelValue === id" :size="14" class="text-white" />
      </div>
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<script setup>
import { CheckIcon } from "lucide-vue-next";

defineProps({
  // The unique ID for this specific option
  id: { type: [String, Number], required: true },
  // The current active/selected ID in the parent state
  modelValue: { type: [String, Number], default: null },
  label: { type: String, default: '' },
  name: { type: String, default: 'selection-group' }
});

defineEmits(['update:modelValue']);
</script>