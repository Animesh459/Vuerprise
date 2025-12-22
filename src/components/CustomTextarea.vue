<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-400 mb-1">
      {{ label }}
    </label>
    <textarea
        :id="id"
        :rows="rows"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-cyan-500/50 transition-all outline-none"
        :placeholder="placeholder"
        :required="required"
    ></textarea>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  rows: { type: [String, Number], default: 4 }, // Number of rows to display by default
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false }
});

defineEmits(['update:modelValue']);
</script>